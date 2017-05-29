const _HOST             = 'localhost';
const _PORT             = 5672;
const _AMQP_PROTOCOL    = 'amqp://';
const _LOGIN            = 'guest';
const _PASSWORD         = 'guest';
const _CONNECTION_TIMEOUT = 10000;
const _AUTH_MECHANISM   = 'AMQPLAIN';
const _V_HOST           = '/';
const _SSL              = {
    enabled : false
};
const _QUEUE_NAME       = 'my-hardcoded-queue-test';

module.exports = {
    HOST:               _HOST,
    PORT:               _PORT,
    AMQP_PROTOCOL:      _AMQP_PROTOCOL,
    LOGIN:              _LOGIN,
    PASSWORD:           _PASSWORD,
    CONNECTION_TIMEOUT: _CONNECTION_TIMEOUT,
    AUTH_MECHANISM:     _AUTH_MECHANISM,
    V_HOST:             _V_HOST,
    SSL:                _SSL,
    QUEUE_NAME:         _QUEUE_NAME,
};