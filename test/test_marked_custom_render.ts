import tap from 'tap';

import { sanitize } from '../utils/marked_custom_render';

tap.equal(sanitize('input'), 'input');
