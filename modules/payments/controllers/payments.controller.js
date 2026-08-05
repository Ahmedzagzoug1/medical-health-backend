const async_wrapper=require('../../../shared/middleware/async_wrapper');
const {API_KEY,INTEGRATION_IDS,CARD,WALLET,KOISK,IFRAME_ID,PAYMOB_HMAC_SECRET}=
require('../../../config/app.config');




const getPaymentUrl= async_wrapper( (req, res,next) => {
  try {
    // 1. تحديد المعاملات المطلوبة (Required Body Params)
    const { amount, firstName, lastName, email, phoneNumber, paymentType } = req.body;

    // التحقق من وجود البيانات الأساسية
    if (!amount || !paymentType || !email) {
      return res.status(400).json({ error: "Missing required fields: amount, email, or paymentType" });
    }
    console.log('Payment Type:', paymentType);
    // اختيار الـ Integration ID بناءً على النوع (Card هو الافتراضي)
    const selectedIntegrationId = INTEGRATION_IDS[paymentType] || INTEGRATION_IDS.card;

    // --- الخطوة 1: Authentication ---
    const authResponse = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: API_KEY }),
    });
    const { token } = await authResponse.json();

    // --- الخطوة 2: Order Registration ---
    const orderResponse = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: token,
        delivery_needed: false,
        amount_cents: amount * 100,
        currency: "EGP",
        items: [],
      }),
    });
    const orderData = await orderResponse.json();

    // --- الخطوة 3: Payment Key Generation ---
    const paymentResponse = await fetch("https://accept.paymob.com/api/acceptance/payment_keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: token,
        amount_cents: amount * 100,
        expiration: 3600,
        order_id: orderData.id,
        billing_data: {
          // بيانات إجبارية (Required)
          first_name: firstName || "Guest",
          last_name: lastName || "User",
          email: email,
          phone_number: phoneNumber || "01000000000",
          // بيانات تكميلية (Not Required - Defaulted to NA)
          city: req.body.city || "Cairo",
          country: req.body.country || "EG",
          street: req.body.street || "NA",
          building: req.body.building || "NA",
          floor: req.body.floor || "NA",
          apartment: req.body.apartment || "NA",
          state: req.body.state || "Cairo",
          postal_code: req.body.postalCode || "NA",
          shipping_method: "NA"
        },
        currency: "EGP",
        integration_id: selectedIntegrationId,
      }),
    });
const paymentData = await paymentResponse.json();

if (paymentData.token) {
    let responseData = {
        token: paymentData.token,
        orderId: orderData.id,
        paymentType: paymentType
    };

    if (paymentType === 'card') {
        // لو كارت: بنبعت الـ Iframe URL التقليدي
        responseData.iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/${IFRAME_ID}?payment_token=${paymentData.token}`;
    } else if (paymentType === 'wallet') {
        // لو محفظة: بايموب مش بتستخدم Iframe، لازم تروح تجيب الـ Redirection URL
        // ملحوظة: في المحفظة، بايموب بتبعت الـ Redirection URL في رد الـ Payment Key في بعض الـ Integrations
        // أو بتحتاج تضرب API تانية اسمها "Pay API" (وده الأفضل للمحافظ)
        
        // كحل سريع ومباشر للمحافظ (بناءً على الـ Integration ID بتاع المحفظة):
        responseData.redirectUrl = `https://accept.paymob.com/api/acceptance/payments/pay?payment_token=${paymentData.token}`;
    } else {
        // أي وسيلة تانية زي فوري مثلاً
        responseData.redirectUrl = `https://accept.paymob.com/api/acceptance/payments/pay?payment_token=${paymentData.token}`;
    }

    res.json(responseData);
} else {
    res.status(400).json({ error: "Paymob Error", details: paymentData });
}

  } catch (error) {
    console.error("Payment Flow Error:", error);
    res.status(500).json({ error: "Internal Server Error during payment processing" });
  }
});


const paymobWebhook=async_wrapper( (req, res,next) => {
    console.log('Received webhook request');
    const { hmac } = req.query; // التوقيع اللي جاي من بايموب
    const data = req.body.obj;  // بيانات العملية
    console.log('Webhook Data:', data);
    // 1. ترتيب البيانات الأساسية بنظام بايموب (مهم جداً الترتيب)
    const requestData = [
        data.amount_cents,
        data.created_at,
        data.currency,
        data.error_occured,
        data.has_parent_transaction,
        data.id,
        data.integration_id,
        data.is_3d_secure,
        data.is_auth,
        data.is_capture,
        data.is_refunded,
        data.is_standalone_payment,
        data.is_voided,
        data.order.id,
        data.owner,
        data.pending,
        data.source_data.pan,
        data.source_data.sub_type,
        data.source_data.type,
        data.success,
    ].join('');

    // 2. حساب الـ HMAC باستخدام الـ Secret Key بتاعك
    const secret = PAYMOB_HMAC_SECRET; 
    const calculatedHmac = crypto
        .createHmac('sha512', secret)
        .update(requestData)
        .digest('hex');

    // 3. المقارنة
    if (calculatedHmac === hmac) {
        console.log("العملية سليمة ومؤكدة!");
        if (data.success === true) {
            console.log("الدفع تم بنجاح!");
            // حدث الداتابيز هنا (تم الدفع)
        }
        res.status(200).send('OK');
    } else {
        console.log("تنبيه: محاولة اختراق أو بيانات غير صحيحة!");
        res.status(400).send('Invalid HMAC');
    }
});
module.exports= {getPaymentUrl,paymobWebhook};