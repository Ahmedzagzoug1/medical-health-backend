module.exports = {
  UpdateProfileRequest: {
    type: "object",
    properties: {
      name: {
        type: "string",
        example: "Ahmed Mohamed"
      }
    }
  },

  ChangePasswordRequest: {
    type: "object",
    required: ["currentPassword", "newPassword"],
    properties: {
      currentPassword: {
        type: "string",
        format: "password",
        example: "oldPassword123"
      },
      newPassword: {
        type: "string",
        format: "password",
        example: "newPassword123"
      }
    }
  },

  UploadAvatarRequest: {
    type: "object",
    properties: {
      avatar: {
        type: "string",
        format: "binary"
      }
    }
  },

  UserProfileResponse: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "Success"
      },
      data: {
        type: "object",
        properties: {
          user: {
            $ref: "#/components/schemas/User"
          }
        }
      }
    }
  },

  UsersResponse: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "Success"
      },
      totalUsers: {
        type: "integer",
        example: 25
      },
      data: {
        type: "object",
        properties: {
          users: {
            type: "array",
            items: {
              $ref: "#/components/schemas/User"
            }
          }
        }
      }
    }
  },

  AvatarResponse: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "Success"
      },
      data: {
        type: "object",
        properties: {
          avatar: {
            type: "string",
            example: "uploads/avatar-1723456789.png"
          }
        }
      }
    }
  },

  MessageResponse: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "Success"
      },
      message: {
        type: "string",
        example: "Operation completed successfully"
      }
    }
  }
};