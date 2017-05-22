/*!
 * Model module.
 *
 * Copyright (c) 2012-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
import angular from 'angular';
import ModelService from './model-service.js';

var module = angular.module('bedrock.model', []);

module.service('brModelService', ModelService);
