<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'if0_37063750_ukmpdb' );

/** Database username */
define( 'DB_USER', '37063750_4' );

/** Database password */
define( 'DB_PASSWORD', '8i3(S!CS4p' );

/** Database hostname */
define( 'DB_HOST', 'sql202.byetcluster.com' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'xlvmgvc5xcyb3niwox38dkvhkgjdgehvfr0vcqzt8tlmn3q3bt65nyv9j0mqc8um' );
define( 'SECURE_AUTH_KEY',  'r4ekdxd6nczcqua7iwtnwlhqlmgr8a44ij0czev6d2wmyiqsmo834wgxtmlnnjix' );
define( 'LOGGED_IN_KEY',    'jhdwpflrrm2fsucstifvodcg6yvfiumhnl00sgjlvfsqryiizn4zy8bcxcaysu4d' );
define( 'NONCE_KEY',        'e4jupdthoasazxlnrw6wtzzhvin5ewpnovdsijdvnxqclys35rv1cn8jmualu7ms' );
define( 'AUTH_SALT',        'q2nsyfzzcxeeiwqxqjhxskksfzhojqarlpdqyohjfdytemflnl1eprcpyfy46spl' );
define( 'SECURE_AUTH_SALT', 'krn3vaawcawwhmgfxopahbcyyqib8dzwazbgygz5otm3kdrlpvi1up837wwfjx9p' );
define( 'LOGGED_IN_SALT',   'ttszhkbo2zydblsj7gs1hixd5sxasf1cvovi63pzvzvfkfdqook09fukq4hlefzj' );
define( 'NONCE_SALT',       '8utsbt6o5of1tueedh12tt08pwqp45h1eqeoylikp40taixzgxgcd4bop2yfgrdc' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'ukmp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
