'use strict';



;define('cablemap-gis/app', ['exports', 'cablemap-gis/resolver', 'ember-load-initializers', 'cablemap-gis/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
;define('cablemap-gis/components/company-logos', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    didInsertElement() {
      this._super(...arguments);
      let application = Ember.getOwner(this).application;
      application.swapCompany();
    }
  });
});
;define('cablemap-gis/components/link-to-landing-point', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    mouseEnter() {
      let application = Ember.getOwner(this).application;
      let anchor = Ember.$(this.element).find('a')[0];
      application.map.infoBox.setPosition(new google.maps.LatLng(Ember.$(anchor).attr('name').split(",")[0], Ember.$(anchor).attr('name').split(",")[1]));
      application.map.infoBox.setContent(`<div class="infoBoxContent"><div class="infoBoxPointer"></div>${Ember.$(anchor)[0].innerHTML}</div>`);
      application.map.infoBox.open(application.map.gmap);
    },
    mouseLeave() {
      let application = Ember.getOwner(this).application;
      application.map.infoBox.close();
    }
  });
});
;define('cablemap-gis/components/map-container', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ['map-container'],
    didInsertElement() {
      this._super(...arguments);
      let application = Ember.getOwner(this).application;
      Ember.$('body').find('.ember-view').first().addClass('map-container');
      if (!application.map && application.mapConfig) {
        application.set('map', new SubmarineCable.Map('map', application.mapConfig));
      }
    }
  });
});
;define('cablemap-gis/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define('cablemap-gis/helpers/app-version', ['exports', 'cablemap-gis/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
;define('cablemap-gis/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
;define('cablemap-gis/helpers/rfs-link', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.rfsLink = rfsLink;
  function rfsLink(params) {
    let rfs = params[0];
    if (rfs == "n.a.") {
      return rfs;
    } else {
      return new Ember.String.htmlSafe(`<a href="/#/ready-for-service/${rfs.replace(/(Q|H)[1-4]{1}/, "").match(/\d/g).join("")}">${rfs}</a>`);
    }
  }

  exports.default = Ember.Helper.helper(rfsLink);
});
;define('cablemap-gis/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
;define('cablemap-gis/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'cablemap-gis/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define('cablemap-gis/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
;define('cablemap-gis/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
;define('cablemap-gis/initializers/export-application-global', ['exports', 'cablemap-gis/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
;define('cablemap-gis/initializers/setup-map', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize(application) {

    application.set('apiPath', "api/v2");
    application.set('map', null);
    application.set('search', null);
    application.set('getSlug', function (model) {
      let slug = null;
      if (!model.slug) {
        slug = model;
      } else {
        slug = model.slug;
      }
      return slug;
    });

    application.set('swapCompany', function (currentCompany = Math.round(Math.random())) {
      let companyNames = ['Huawei Marine', 'Equinix'];
      companyNames.forEach(function (d, i) {
        let target = Ember.$(`.${companyNames[i].toLowerCase().replace(" ", "-")}-logo`);
        i == currentCompany ? target.fadeIn() : target.fadeOut();
      });
      Ember.$("span.company, span.company-portrait").text(`Sponsored in part by ${companyNames[currentCompany]}`);
      setTimeout(function () {
        application.swapCompany(currentCompany ? 0 : 1);
      }, 5000);
    });

    application.deferReadiness();
    Ember.$.getJSON(`/${application.apiPath}/config.json`, function (data) {
      application.set('mapConfig', data);
      application.set('search', new SubmarineCable.Search());
      application.advanceReadiness();
    });
  }

  exports.default = {
    initialize
  };
});
;define('cablemap-gis/instance-initializers/ember-data', ['exports', 'ember-data/initialize-store-service'], function (exports, _initializeStoreService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
});
;define('cablemap-gis/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
;define('cablemap-gis/router', ['exports', 'cablemap-gis/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route("submarine-cable", { path: "/submarine-cable/:slug" });
    this.route("landing-point", { path: "/landing-point/:slug" });
    this.route("country", { path: "/country/:slug" });
    this.route("ready-for-service", { path: "/ready-for-service/:slug" });
  });

  exports.default = Router;
});
;define('cablemap-gis/routes/country', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    setupController(controller, model) {
      this._super(...arguments);
      window.scrollTo(0, 0);
      let application = Ember.getOwner(this).application;
      Ember.$.getJSON(`${application.apiPath}/country/${application.getSlug(model)}.json`, function (data) {
        controller.set("model", data);
        if (application.map) {
          application.map.selectCountry(data.cables, data.landing_points, data.latlon);
        }
      });
    }
  });
});
;define('cablemap-gis/routes/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    setupController(controller) {
      this._super(...arguments);
      let application = Ember.getOwner(this).application;
      window.scrollTo(0, 0);
      Ember.$.getJSON(`${application.apiPath}/cable/all.json`, function (data) {
        if (application.map) {
          application.map.resetMap();
        }
        controller.set("model", data);
      });
    }
  });
});
;define('cablemap-gis/routes/landing-point', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    setupController(controller, model) {
      this._super(...arguments);
      window.scrollTo(0, 0);
      let application = Ember.getOwner(this).application;
      Ember.$.getJSON(`${application.apiPath}/landing-point/${application.getSlug(model)}.json`, function (data) {
        controller.set("model", data);
        if (application.map) {
          application.map.selectLandingPoint(data.name, new google.maps.LatLng(data.latitude, data.longitude));
        }
      });
    }
  });
});
;define('cablemap-gis/routes/ready-for-service', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    setupController(controller, model) {
      this._super(...arguments);
      window.scrollTo(0, 0);
      let application = Ember.getOwner(this).application;
      Ember.$.getJSON(`${application.apiPath}/ready-for-service/${application.getSlug(model)}.json`, function (data) {
        controller.set("model", data);
        if (application.map) {
          application.map.resetBounds();
          application.map.selectRfs(data);
        }
      });
    }
  });
});
;define('cablemap-gis/routes/submarine-cable', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    setupController(controller, model) {
      this._super(...arguments);
      window.scrollTo(0, 0);
      let application = Ember.getOwner(this).application;
      Ember.$.getJSON(`${application.apiPath}/cable/${application.getSlug(model)}.json`, function (data) {
        controller.set("model", data);
        if (application.map) {
          application.map.selectCable(data.id, data.landing_points);
        }
      });
    }
  });
});
;define('cablemap-gis/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define("cablemap-gis/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "EsvOCypB", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"id\",\"header-portrait\"],[9],[0,\"\\n\\t\"],[7,\"a\"],[11,\"id\",\"telegeography-logo-portrait\"],[11,\"onclick\",\"window.open(this.href, 'tg'); return false;\"],[11,\"href\",\"http://www.telegeography.com/\"],[9],[10],[0,\"\\n\\t\"],[7,\"h1\"],[9],[0,\"Submarine Cable Map\"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"company-logo-portraits\"],[9],[0,\"\\n    \"],[7,\"a\"],[11,\"class\",\"company-logo-portrait huawei-marine-logo\"],[11,\"href\",\"http://www.huaweimarine.com/en/?utm_medium=display&utm_source=corp_submarinecablemap&utm_campaign=alwayson\"],[9],[10],[0,\"\\n  \\t\"],[7,\"a\"],[11,\"class\",\"company-logo-portrait equinix-logo\"],[11,\"href\",\"https://www.equinix.com/?ls=Advertising%20-%20Web&lsd=19q1_cross-vertical_no-program__vertical_Equinix-run_partner-site_telegeography_us-en_AMER_TeleGeography-Submarine-Cable-Map&utm_campaign=us-en_telegeography_partner-site_TeleGeography-Submarine-Cable-Map_vertical&utm_source=telegeography&utm_medium=partner-site&utm_content=no-program_telegeoraphy-cable-map+eqix-logo-link\"],[9],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[1,[21,\"map-container\"],false],[0,\"\\n\"],[7,\"div\"],[11,\"id\",\"side_bar\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"id\",\"header\"],[9],[0,\"\\n\\t\\t\"],[7,\"h1\"],[11,\"style\",\"margin-bottom: 10px;\"],[9],[0,\"Submarine Cable Map\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"id\",\"nav\"],[11,\"class\",\"ui-widget\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"input\"],[11,\"id\",\"search\"],[9],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[7,\"div\"],[11,\"id\",\"content\"],[9],[1,[21,\"outlet\"],false],[10],[0,\"\\n\"],[10],[0,\"\\n\"],[7,\"div\"],[11,\"id\",\"updated-on\"],[9],[7,\"a\"],[11,\"onclick\",\"window.open(this.href,'github'); return false;\"],[11,\"href\",\"https://github.com/telegeography/www.submarinecablemap.com\"],[9],[10],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "cablemap-gis/templates/application.hbs" } });
});
;define("cablemap-gis/templates/components/company-logos", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8y9rfOZt", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"company-logos\"],[9],[0,\"\\n  \"],[7,\"a\"],[11,\"class\",\"company-logo huawei-marine-logo\"],[11,\"href\",\"http://www.huaweimarine.com/en/?utm_medium=display&utm_source=corp_submarinecablemap&utm_campaign=alwayson\"],[9],[10],[0,\"\\n  \"],[7,\"a\"],[11,\"class\",\"company-logo equinix-logo\"],[11,\"href\",\"https://www.equinix.com/?ls=Advertising%20-%20Web&lsd=19q1_cross-vertical_no-program__vertical_Equinix-run_partner-site_telegeography_us-en_AMER_TeleGeography-Submarine-Cable-Map&utm_campaign=us-en_telegeography_partner-site_TeleGeography-Submarine-Cable-Map_vertical&utm_source=telegeography&utm_medium=partner-site&utm_content=no-program_telegeoraphy-cable-map+eqix-logo-link\"],[9],[10],[0,\"\\n\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "cablemap-gis/templates/components/company-logos.hbs" } });
});
;define("cablemap-gis/templates/components/copyright-year", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "azoIVnP/", "block": "{\"symbols\":[],\"statements\":[],\"hasEval\":false}", "meta": { "moduleName": "cablemap-gis/templates/components/copyright-year.hbs" } });
});
;define("cablemap-gis/templates/components/link-to-landing-point", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "l7KqITBX", "block": "{\"symbols\":[],\"statements\":[[7,\"a\"],[12,\"href\",[23,[\"lp\",\"url\"]]],[12,\"name\",[23,[\"lp\",\"latlon\"]]],[9],[1,[23,[\"lp\",\"name\"]],false],[10]],\"hasEval\":false}", "meta": { "moduleName": "cablemap-gis/templates/components/link-to-landing-point.hbs" } });
});
;define("cablemap-gis/templates/components/map-container", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "PZBImWin", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"id\",\"map\"],[9],[10]],\"hasEval\":false}", "meta": { "moduleName": "cablemap-gis/templates/components/map-container.hbs" } });
});
;define("cablemap-gis/templates/country", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "mtkRrVwz", "block": "{\"symbols\":[\"cable\"],\"statements\":[[4,\"link-to\",[\"index\"],[[\"id\"],[\"allCables\"]],{\"statements\":[[0,\"Submarine Cable List\"]],\"parameters\":[]},null],[0,\"\\n\"],[7,\"h2\"],[11,\"id\",\"name\"],[9],[1,[23,[\"model\",\"name\"]],false],[10],[0,\"\\n\"],[7,\"div\"],[11,\"id\",\"description\"],[11,\"style\",\"margin-top: 15px;\"],[9],[0,\"\\n\\t\"],[7,\"h3\"],[9],[0,\"Cables\"],[10],[0,\"\\n\\t\"],[7,\"ul\"],[11,\"class\",\"features\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\",\"cables\"]]],null,{\"statements\":[[0,\"\\t\\t\"],[7,\"li\"],[9],[0,\"\\n\\t\\t\\t\"],[4,\"link-to\",[\"submarine-cable\",[22,1,[\"id\"]]],null,{\"statements\":[[1,[22,1,[\"name\"]],false]],\"parameters\":[]},null],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\t\"],[10],[0,\"\\n\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "cablemap-gis/templates/country.hbs" } });
});
;define("cablemap-gis/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "F6QkT0hF", "block": "{\"symbols\":[\"cable\"],\"statements\":[[7,\"h2\"],[9],[0,\"\\n\\tSubmarine Cables\\n\"],[10],[0,\"\\n\"],[7,\"div\"],[11,\"id\",\"description\"],[9],[0,\"\\n\\t\"],[7,\"ul\"],[11,\"class\",\"features\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\"]]],null,{\"statements\":[[0,\"\\t\\t\\t\"],[7,\"li\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[4,\"link-to\",[\"submarine-cable\",[22,1,[\"id\"]]],null,{\"statements\":[[1,[22,1,[\"name\"]],false]],\"parameters\":[]},null],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\t\"],[10],[0,\"\\n\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "cablemap-gis/templates/index.hbs" } });
});
;define("cablemap-gis/templates/landing-point", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "QgppEljv", "block": "{\"symbols\":[\"cable\"],\"statements\":[[4,\"link-to\",[\"index\"],[[\"id\"],[\"allCables\"]],{\"statements\":[[0,\"Submarine Cable List\"]],\"parameters\":[]},null],[0,\"\\n\"],[7,\"h2\"],[11,\"id\",\"name\"],[9],[1,[23,[\"model\",\"name\"]],false],[10],[0,\"\\n\"],[7,\"div\"],[11,\"id\",\"description\"],[11,\"style\",\"margin-top: 15px;\"],[9],[0,\"\\n\\t\"],[7,\"h3\"],[9],[0,\"Cables\"],[10],[0,\"\\n\\t\"],[7,\"ul\"],[11,\"class\",\"features\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\",\"cables\"]]],null,{\"statements\":[[0,\"\\t\\t\"],[7,\"li\"],[9],[0,\"\\n\\t\\t\\t\"],[4,\"link-to\",[\"submarine-cable\",[22,1,[\"id\"]]],null,{\"statements\":[[1,[22,1,[\"name\"]],false]],\"parameters\":[]},null],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\t\"],[10],[0,\"\\n\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "cablemap-gis/templates/landing-point.hbs" } });
});
;define("cablemap-gis/templates/ready-for-service", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "SguFvAPi", "block": "{\"symbols\":[\"cable\"],\"statements\":[[4,\"link-to\",[\"index\"],[[\"id\"],[\"allCables\"]],{\"statements\":[[0,\"Submarine Cable List\"]],\"parameters\":[]},null],[0,\"\\n\"],[7,\"h2\"],[11,\"id\",\"name\"],[9],[0,\"Ready For Service In \"],[1,[23,[\"model\",\"rfs\"]],false],[10],[0,\"\\n\"],[7,\"div\"],[11,\"id\",\"description\"],[11,\"style\",\"margin-top: 15px;\"],[9],[0,\"\\n\\t\"],[7,\"ul\"],[11,\"class\",\"features\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\",\"cables\"]]],null,{\"statements\":[[0,\"\\t\\t\"],[7,\"li\"],[9],[0,\"\\n\\t\\t\\t\"],[4,\"link-to\",[\"submarine-cable\",[22,1,[\"id\"]]],null,{\"statements\":[[1,[22,1,[\"name\"]],false]],\"parameters\":[]},null],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\t\"],[10],[0,\"\\n\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "cablemap-gis/templates/ready-for-service.hbs" } });
});
;define("cablemap-gis/templates/submarine-cable", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Vj+h7az1", "block": "{\"symbols\":[\"lp\"],\"statements\":[[4,\"link-to\",[\"index\"],[[\"id\"],[\"allCables\"]],{\"statements\":[[0,\"Submarine Cable List\"]],\"parameters\":[]},null],[0,\"\\n\"],[7,\"h2\"],[11,\"id\",\"name\"],[9],[0,\"\\n\\t\"],[1,[23,[\"model\",\"name\"]],false],[0,\"\\n\"],[10],[0,\"\\n\"],[7,\"div\"],[11,\"id\",\"description\"],[11,\"style\",\"margin-top: 15px;\"],[9],[0,\"\\n\\t\"],[7,\"ul\"],[11,\"class\",\"properties\"],[9],[0,\"\\n\"],[4,\"if\",[[23,[\"model\",\"rfs\"]]],null,{\"statements\":[[0,\"\\t\\t  \"],[7,\"li\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"strong\"],[9],[0,\"RFS:\"],[10],[0,\" \"],[1,[27,\"rfs-link\",[[23,[\"model\",\"rfs\"]]],null],false],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[23,[\"model\",\"length\"]]],null,{\"statements\":[[0,\"\\t\\t  \"],[7,\"li\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"strong\"],[9],[0,\"Cable Length:\"],[10],[0,\" \"],[1,[23,[\"model\",\"length\"]],false],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[23,[\"model\",\"owners\"]]],null,{\"statements\":[[0,\"\\t\\t  \"],[7,\"li\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"strong\"],[9],[0,\"Owners:\"],[10],[0,\" \"],[1,[23,[\"model\",\"owners\"]],false],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[23,[\"model\",\"url\"]]],null,{\"statements\":[[0,\"\\t\\t  \"],[7,\"li\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"strong\"],[9],[0,\"URL:\"],[10],[0,\" \"],[7,\"a\"],[12,\"href\",[23,[\"model\",\"url\"]]],[11,\"onclick\",\"window.open(this.href); return false;\"],[9],[1,[23,[\"model\",\"url\"]],false],[10],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"\\t\\t\\t\"],[7,\"li\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"strong\"],[9],[0,\"URL:\"],[10],[0,\" n.a.\"],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[]}],[4,\"if\",[[23,[\"model\",\"notes\"]]],null,{\"statements\":[[0,\"\\t\\t  \"],[7,\"li\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"strong\"],[9],[0,\"Notes:\"],[10],[0,\" \"],[1,[23,[\"model\",\"notes\"]],false],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\t\"],[10],[0,\"\\n\\t\"],[7,\"h2\"],[9],[0,\"\\n\\t\\tLanding Points\\n\\t\"],[10],[0,\"\\n\\t\"],[7,\"ul\"],[11,\"class\",\"features\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\",\"landing_points\"]]],null,{\"statements\":[[0,\"\\t\\t\"],[7,\"li\"],[9],[0,\"\\n\\t\\t\\t\"],[1,[27,\"link-to-landing-point\",null,[[\"lp\"],[[22,1,[]]]]],false],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\t\"],[10],[0,\"\\n\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "cablemap-gis/templates/submarine-cable.hbs" } });
});
;

;define('cablemap-gis/config/environment', [], function() {
  var prefix = 'cablemap-gis';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("cablemap-gis/app")["default"].create({"name":"cablemap-gis","version":"0.0.0+ba715255"});
          }
        
//# sourceMappingURL=cablemap-gis.map
