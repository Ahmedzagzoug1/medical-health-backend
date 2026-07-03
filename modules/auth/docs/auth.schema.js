module.exports = {
  LoginRequest: {
    type: "object",
    required: ["identifier", "password"],
    properties: {
      identifier: {
        type: "string",
        example: "ahmed@example.com or +201052378678"
      },
      password: {
        type: "string",
        format: "password",
        example: "superSecurePassword123"
      }
    }
  },

  RegisterRequest: {
    type: "object",
    required: [
      "name",
      "email",
      "mobile",
      "birthdate",
      "password"
    ],
    properties: {
      name: {
        type: "string",
        example: "Ahmed Admin"
      },
      email: {
        type: "string",
        format: "email",
        example: "ahmed8783@example.com"
      },
      mobile: {
        type: "string",
        example: "+201052378678"
      },
      birthdate: {
        type: "string",
        format: "date",
        example: "1998-05-15"
      },
      role: {
        type: "string",
        enum: ["admin", "doctor", "patient"],
        default: "patient",
        example: "doctor"
      },
      password: {
        type: "string",
        format: "password",
        example: "superSecurePassword123"
      }
    }
  },

  User: {
    type: "object",
    properties: {
      id: {
        type: "string",
        example: "6a43d9ce8e9a39910b8af525"
      },
      name: {
        type: "string",
        example: "Ahmed Admin"
      },
      email: {
        type: "string",
        example: "ahmed8783@example.com"
      },
      mobile: {
        type: "string",
        example: "+201052378678"
      },
      birthdate: {
        type: "string",
        format: "date-time"
      },
      avatar: {
        type: "string",
        example: "../../../uploads/avatar.png"
      },
      role: {
        type: "string",
        enum: ["admin", "doctor", "patient"],
        example: "doctor"
      }
    }
  },

  AuthResponse: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "Success"
      },
      message: {
        type: "string",
        example: "User registered successfully"
      },
      data: {
        type: "object",
        properties: {
          accessToken: {
            type: "string"
          },
          refreshToken: {
            type: "string"
          },
          user: {
            $ref: "#/components/schemas/User"
          }
        }
      }
    }
  }
};