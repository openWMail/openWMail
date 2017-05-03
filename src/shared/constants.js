module.exports = Object.freeze({
  APP_ID: 'openwmail.openwmail',

  MAILBOX_INDEX_KEY: '__index__',
  MAILBOX_SLEEP_WAIT: 1000 * 30, // 30 seconds

  WEB_URL: 'https://github.com/openwmail/openwmail/',
  GITHUB_URL: 'https://github.com/openwmail/openwmail/',
  GITHUB_ISSUE_URL: 'https://github.com/openwmail/openwmail/issues',
  UPDATE_DOWNLOAD_URL: 'https://github.com/openwmail/openwmail/releases',
  UPDATE_CHECK_URL: 'http://geekgonecrazy.com/misc/wmail/version.json',
  PRIVACY_URL: 'https://github.com/openWMail/openWMail/wiki/Privacy-Policy',
  USER_SCRIPTS_WEB_URL: 'https://github.com/Thomas101/wmail-user-scripts',
  UPDATE_CHECK_INTERVAL: 1000 * 60 * 60 * 24, // 24 hours

  GMAIL_PROFILE_SYNC_MS: 1000 * 60 * 60, // 60 mins
  GMAIL_UNREAD_SYNC_MS: 1000 * 60, // 60 seconds
  GMAIL_NOTIFICATION_MAX_MESSAGE_AGE_MS: 1000 * 60 * 60 * 2, // 2 hours
  GMAIL_NOTIFICATION_FIRST_RUN_GRACE_MS: 1000 * 30, // 30 seconds

  REFOCUS_MAILBOX_INTERVAL_MS: 300,

  DB_EXTENSION: 'wmaildb',
  DB_WRITE_DELAY_MS: 500 // 0.5secs
})
