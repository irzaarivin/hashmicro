'use strict';

const CharacterChecker = require('../models/CharacterChecker');


class CheckerController {

  static index(req, res) {
    res.render('checker/index', {
      title: 'Character Checker',
      result: null,
      formData: {},
      messages: req.flash ? req.flash() : {},
    });
  }

  static check(req, res) {
    const { input1, input2, case_type } = req.body;

    const caseSensitive = case_type === 'sensitive';

    const result = CharacterChecker.check(input1, input2, caseSensitive);

    if (result.error) {
      return res.render('checker/index', {
        title: 'Character Checker',
        result: null,
        error: result.error,
        formData: req.body,
        messages: {},
      });
    }

    res.render('checker/index', {
      title: 'Character Checker',
      result,
      formData: req.body,
      messages: {},
    });
  }
}

module.exports = CheckerController;
