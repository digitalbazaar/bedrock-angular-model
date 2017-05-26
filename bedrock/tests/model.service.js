/* globals expect */
var bedrock = GLOBAL.bedrock;

describe('model.service', function() {
  beforeEach(function() {
    bedrock.waitForAngular();
  });

  it('should replace an element in an array by id', function() {
    expect(bedrock.run(function($injector) {
      var array = [
        {id: '1', data: 'foo'},
        {id: '2', data: 'bar'}
      ];
      var service = $injector.get('brModelService');
      service.replaceInArray(array, {id: '1', data: 'new foo'});
      return array;
    })).to.eventually.deep.equal([
      {id: '1', data: 'new foo'},
      {id: '2', data: 'bar'}
    ]);
  });

  it('should replace an element in an array by key', function() {
    expect(bedrock.run(function($injector) {
      var array = [
        {id: '1', key: '2', data: 'foo'},
        {id: '2', key: '1', data: 'bar'}
      ];
      var service = $injector.get('brModelService');
      service.replaceInArray(
        array, {id: '1', key: '2', data: 'new foo'}, 'key');
      return array;
    })).to.eventually.deep.equal([
      {id: '1', key: '2', data: 'new foo'},
      {id: '2', key: '1', data: 'bar'}
    ]);
  });

  it('should replace an element in array by compare function', function() {
    expect(bedrock.run(function($injector) {
      var array = [
        {id: '1', data: 'old foo'},
        {id: '2', data: 'old bar'}
      ];
      var service = $injector.get('brModelService');
      service.replaceInArray(
        array, {id: '1', data: 'new foo'}, function(dst, src) {
          return dst.id === '1';
        });
      return array;
    })).to.eventually.deep.equal([
      {id: '1', data: 'new foo'},
      {id: '2', data: 'old bar'}
    ]);
  });

  it('should replace an array\'s elements by id', function() {
    expect(bedrock.run(function($injector) {
      var array = [
        {id: '1', data: 'old foo'},
        {id: '2', data: 'old bar'},
        {id: '4', data: 'remove'}
      ];
      var service = $injector.get('brModelService');
      service.replaceArray(
        array, [
          {id: '2', data: 'new bar'},
          {id: '1', data: 'new foo'},
          {id: '3', data: 'new'}
        ]);
      return array;
    })).to.eventually.deep.equal([
      {id: '2', data: 'new bar'},
      {id: '1', data: 'new foo'},
      {id: '3', data: 'new'}
    ]);
  });

  it('should replace an array\'s elements by key', function() {
    expect(bedrock.run(function($injector) {
      var array = [
        {id: '1', key: '1', data: 'old foo'},
        {id: '2', key: '2', data: 'old bar'},
        {id: '4', key: '4', data: 'remove'}
      ];
      var service = $injector.get('brModelService');
      service.replaceArray(
        array, [
          {id: '2', key: '1', data: 'new bar'},
          {id: '1', key: '2', data: 'new foo'},
          {id: '3', key: '3', data: 'new'}
        ], 'key');
      return array;
    })).to.eventually.deep.equal([
      {id: '2', key: '1', data: 'new bar'},
      {id: '1', key: '2', data: 'new foo'},
      {id: '3', key: '3', data: 'new'}
    ]);
  });

  it('should replace an array\'s elements by compare function', function() {
    expect(bedrock.run(function($injector) {
      var array = [
        {id: '1', key: '1', data: 'old foo'},
        {id: '2', key: '2', data: 'old bar'},
        {id: '4', key: '4', data: 'remove'}
      ];
      var service = $injector.get('brModelService');
      service.replaceArray(
        array, [
          {id: '2', key: '1', data: 'new bar'},
          {id: '1', key: '2', data: 'new foo'},
          {id: '3', key: '3', data: 'new'}
        ], function(element, candidate) {
          return element.key === candidate.key;
        });
      return array;
    })).to.eventually.deep.equal([
      {id: '2', key: '1', data: 'new bar'},
      {id: '1', key: '2', data: 'new foo'},
      {id: '3', key: '3', data: 'new'}
    ]);
  });

  it('should remove the first element from an array by id', function() {
    expect(bedrock.run(function($injector) {
      var array = [
        {id: '0', data: 'keep'},
        {id: '1', data: 'remove'},
        {id: '2', data: 'keep'},
        {id: '1', data: 'remove'},
        {id: '1', data: 'remove'},
        {id: '3', data: 'keep'}
      ];
      var service = $injector.get('brModelService');
      service.removeFromArray({id: '1'}, array);
      return array;
    })).to.eventually.deep.equal([
      {id: '0', data: 'keep'},
      {id: '2', data: 'keep'},
      {id: '1', data: 'remove'},
      {id: '1', data: 'remove'},
      {id: '3', data: 'keep'}
    ]);
  });

  it('should remove all elements from an array by id', function() {
    expect(bedrock.run(function($injector) {
      var array = [
        {id: '0', data: 'keep'},
        {id: '1', data: 'remove'},
        {id: '2', data: 'keep'},
        {id: '1', data: 'remove'},
        {id: '1', data: 'remove'},
        {id: '3', data: 'keep'}
      ];
      var service = $injector.get('brModelService');
      service.removeAllFromArray({id: '1'}, array);
      return array;
    })).to.eventually.deep.equal([
      {id: '0', data: 'keep'},
      {id: '2', data: 'keep'},
      {id: '3', data: 'keep'}
    ]);
  });

  it('should remove the first element from an array by key', function() {
    expect(bedrock.run(function($injector) {
      var array = [
        {id: '0', data: 'keep'},
        {id: '1', data: 'remove'},
        {id: '2', data: 'keep'},
        {id: '1', data: 'remove'},
        {id: '1', data: 'remove'},
        {id: '3', data: 'keep'}
      ];
      var service = $injector.get('brModelService');
      service.removeFromArray({data: 'remove'}, array, 'data');
      return array;
    })).to.eventually.deep.equal([
      {id: '0', data: 'keep'},
      {id: '2', data: 'keep'},
      {id: '1', data: 'remove'},
      {id: '1', data: 'remove'},
      {id: '3', data: 'keep'}
    ]);
  });

  it('should remove all elements from an array by key', function() {
    expect(bedrock.run(function($injector) {
      var array = [
        {id: '0', data: 'keep'},
        {id: '1', data: 'remove'},
        {id: '2', data: 'keep'},
        {id: '1', data: 'remove'},
        {id: '1', data: 'remove'},
        {id: '3', data: 'keep'}
      ];
      var service = $injector.get('brModelService');
      service.removeAllFromArray({data: 'remove'}, array, 'data');
      return array;
    })).to.eventually.deep.equal([
      {id: '0', data: 'keep'},
      {id: '2', data: 'keep'},
      {id: '3', data: 'keep'}
    ]);
  });

  it('should remove first element from an array by compare function', () => {
    expect(bedrock.run(function($injector) {
      var array = [
        {id: '0', data: 'keep'},
        {id: '1', data: 'remove'},
        {id: '2', data: 'keep'},
        {id: '1', data: 'remove'},
        {id: '1', data: 'remove'},
        {id: '3', data: 'keep'}
      ];
      var service = $injector.get('brModelService');
      service.removeFromArray(array, function(e) {
        return e.id === '1';
      });
      return array;
    })).to.eventually.deep.equal([
      {id: '0', data: 'keep'},
      {id: '2', data: 'keep'},
      {id: '1', data: 'remove'},
      {id: '1', data: 'remove'},
      {id: '3', data: 'keep'}
    ]);
  });

  it('should remove all elements from an array by compare function', () => {
    expect(bedrock.run(function($injector) {
      var array = [
        {id: '0', data: 'keep'},
        {id: '1', data: 'remove'},
        {id: '2', data: 'keep'},
        {id: '1', data: 'remove'},
        {id: '1', data: 'remove'},
        {id: '3', data: 'keep'}
      ];
      var service = $injector.get('brModelService');
      service.removeAllFromArray(array, function(e) {
        return e.id === '1';
      });
      return array;
    })).to.eventually.deep.equal([
      {id: '0', data: 'keep'},
      {id: '2', data: 'keep'},
      {id: '3', data: 'keep'}
    ]);
  });

});
