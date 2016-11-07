var _marked = [range].map(regeneratorRuntime.mark);

export function range(begin, end) {
  var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var i, number;
  return regeneratorRuntime.wrap(function range$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = begin;

        case 1:
          if (!(i <= end)) {
            _context.next = 8;
            break;
          }

          number = String(i);
          _context.next = 5;
          return number.length === 1 ? '0' + i : i;

        case 5:
          i += interval;
          _context.next = 1;
          break;

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}