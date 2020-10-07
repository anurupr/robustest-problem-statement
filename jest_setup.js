jest.spyOn(global.console, 'log').mockImplementation(() => jest.fn());

// https://stackoverflow.com/a/57439821/839456
import 'regenerator-runtime/runtime'