module('Data adapters - Array');

var ArrayData = require('select2/data/array');
var $ = require('jquery');
var Options = require('select2/options');

var options = new Options({
  data: [
    {
      id: 'default',
      text: 'Default'
    },
    {
      id: '1',
      text: 'One'
    },
    {
      id: '2',
      text: '2'
    }
  ]
});

test('current gets default for single', function (assert) {
  var $select = $('#qunit-fixture .single');

  var data = new ArrayData($select, options);

  data.current(function (val) {
    assert.equal(
      val.length,
      1,
      'There should always be a selected item for array data.'
    );

    var item = val[0];

    assert.equal(
      item.id,
      'default',
      'The first item should be selected'
    );
  });
});

test('current gets default for multiple', function (assert) {
  var $select = $('#qunit-fixture .multiple');

  var data = new ArrayData($select, options);

  data.current(function (val) {
    assert.equal(
      val.length,
      0,
      'There should be no default selection.'
    );
  });
});

test('current works with existing selections', function (assert) {
  var $select = $('#qunit-fixture .multiple');

  var data = new ArrayData($select, options);

  $select.val(['3']);

  data.current(function (val) {
    assert.equal(
      val.length,
      1,
      'There should only be one existing selection.'
    );

    var option = val[0];

    assert.equal(
      option.id,
      '3',
      'The id should be equal to the value of the option tag.'
    );

    assert.equal(
      option.text,
      'Three',
      'The text should be equal to the text of the option tag.'
    );
  });
});

test('current works with selected data', function (assert) {
  var $select = $('#qunit-fixture .single');

  var data = new ArrayData($select, options);

  data.select({
    id: '2',
    text: '2'
  });

  data.current(function (val) {
    assert.equal(
      val.length,
      1,
      'There should only be one option selected.'
    );

    var option = val[0];

    assert.equal(
      option.id,
      '2',
      'The id should match the original id from the array.'
    );

    assert.equal(
      option.text,
      '2',
      'The text should match the original text from the array.'
    );
  });
});

test('select works for single', function (assert) {
  var $select = $('#qunit-fixture .single');

  var data = new ArrayData($select, options);

  assert.equal(
    $select.val(),
    'default',
    'There should already be a selection'
  );

  data.select({
    id: '1',
    text: 'One'
  });

  assert.equal(
    $select.val(),
    '1',
    'The selected value should be the same as the selected id'
  );
});

test('multiple sets the value', function (assert) {
  var $select = $('#qunit-fixture .multiple');

  var data = new ArrayData($select, options);

  assert.equal($select.val(), null);

  data.select({
    id: 'default',
    text: 'Default'
  });

  assert.deepEqual($select.val(), ['default']);
});

test('multiple adds to the old value', function (assert) {
  var $select = $('#qunit-fixture .multiple');

  var data = new ArrayData($select, options);

  $select.val(['3']);

  assert.deepEqual($select.val(), ['3']);

  data.select({
    id: 'default',
    text: 'Default'
  });

  assert.deepEqual($select.val(), ['3', 'default']);
});

test('option tags are automatically generated', function (assert) {
  var $select = $('#qunit-fixture .single');

  var data = new ArrayData($select, options);

  assert.equal(
    $select.find('option').length,
    3,
    'An <option> element should be created for each object'
  );
});
