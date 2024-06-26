
export enum STATUS_CODE {
    ERROR_UNKNOWN = 5050,
    ERROR_SERVICE_UNAVAILABLE = 5051,
    ERROR_REQUEST_TIMEOUT = 5052,
    USER_NOT_FOUND_ERROR = 5200,
    USER_USERNAME_EXISTS_ERROR = 5201,
    USER_EMAIL_EXIST_ERROR = 5202,
    USER_MOBILE_NUMBER_EXIST_ERROR = 5203,
    USER_IS_ACTIVE_ERROR = 5204,
    USER_INACTIVE_ERROR = 5205,
    USER_INACTIVE_PERMANENT_ERROR = 5206,
    USER_PASSWORD_NOT_MATCH_ERROR = 5207,
    USER_PASSWORD_NEW_MUST_DIFFERENCE_ERROR = 5208,
    USER_PASSWORD_EXPIRED_ERROR = 5209,
    USER_PASSWORD_ATTEMPT_MAX_ERROR = 5210,
    USER_BLOCKED_ERROR = 5211,
    NOT_FOUND_ERROR = 5200,
    /* Request Error */
    REQUEST_VALIDATION_ERROR = 5070,
    REQUEST_TIMESTAMP_INVALID_ERROR = 5071,
    REQUEST_USER_AGENT_INVALID_ERROR = 5072,
    REQUEST_USER_AGENT_OS_INVALID_ERROR = 5073,
    REQUEST_USER_AGENT_BROWSER_INVALID_ERROR = 5074,
    /* Auth Error */
    AUTH_JWT_ACCESS_TOKEN_ERROR = 5000,
    AUTH_JWT_REFRESH_TOKEN_ERROR = 5001,
    AUTH_GOOGLE_SSO_ERROR = 5002,

    INSUFFICIENT_BALANCE = 5000,
}