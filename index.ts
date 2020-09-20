// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
	require('./build/server/index');
} else {
	require('./server/index');
}
