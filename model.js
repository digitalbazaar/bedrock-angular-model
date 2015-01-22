/*!
 * Model module.
 *
 * Copyright (c) 2012-2015 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define(['angular', './model-service'], function(angular, modelService) {

'use strict';

var module = angular.module('app.model', []);

module.service(modelService);

return module.name;

});
