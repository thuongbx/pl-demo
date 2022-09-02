module.exports = function (Handlebars) {
  Handlebars.registerHelper('reset', function (cacheBuster) {
    Handlebars._loadedCss = [];
    Handlebars._loadedJs = [];
    Handlebars._cacheBuster = cacheBuster ? '?t=' + cacheBuster : '';
    Handlebars._noCssJs = false;
  });

  Handlebars.registerHelper('noCssJs', function () {
    Handlebars._noCssJs = true;
  });

  Handlebars.registerHelper('requireJs', function (path) {
    if (Handlebars._noCssJs) {
      return;
    }

    Handlebars._loadedJs = Handlebars._loadedJs || [];
    if (Handlebars._loadedJs.includes(path)) {
      return;
    }
    Handlebars._loadedJs.push(path);

    cacheBuster = Handlebars._cacheBuster;
    path = /^https?:\/\//gi.test(path)
      ? path
      : path.startsWith("vendors/") ?
        "/assets/" + path + ".js"
        : "/assets/js/" + path + ".js" + cacheBuster;
    var result = '<script defer src="' + path + '" data-pl-require></script>';
    return new Handlebars.SafeString(result);
  });

  Handlebars.registerHelper('requireCss', function (path) {
    if (Handlebars._noCssJs) {
      return;
    }

    Handlebars._loadedCss = Handlebars._loadedCss || [];
    if (Handlebars._loadedCss.includes(path)) {
      return;
    }
    Handlebars._loadedCss.push(path);

    cacheBuster = Handlebars._cacheBuster;
    path = /^https?:\/\//gi.test(path)
      ? path
      : path.startsWith("vendors/") ?
        "/assets/" + path + ".css"
        : "/assets/css/" + path + ".css" + cacheBuster;
    var result = '<link rel="stylesheet" href="' + path + '" data-pl-require />';
    return new Handlebars.SafeString(result);
  });

  Handlebars.registerHelper('json', function (context) {
    return JSON.stringify(context);
  });

  Handlebars.registerHelper('jsonHtml', function (context) {
    var json = JSON.stringify(context, null, 2);

    return new Handlebars.SafeString(json);
  });

  Handlebars.registerHelper('getProps', function (context) {
    if (!context || !context.props) {
      return;
    }

    if (context.props.constructor === Array && context.props.length) {
      var result = "";
      context.props.forEach(prop => {
        result += prop.name;

        if (prop.value) {
          result += '="' + prop.value + '" ';
        }
      })
      return new Handlebars.SafeString(result);
    }
    if (typeof context.props === 'object' && !Array.isArray(context.props)) {
      var result = "";
      for (const [key, value] of Object.entries(context.props)) {
        if (result) {
          result += " " + key;
        } else {
          result = key;
        }

        if (value) {
          result += '="' + value + '"';
        }
      }

      return new Handlebars.SafeString(result);
    }
  });

  Handlebars.registerHelper('getModifiers', function (context) {
    if (!context || !context.styleModifier) {
      return;
    }

    if (typeof context.styleModifier === 'string' || context.styleModifier instanceof String) {
      return context.styleModifier;
    }

    if (context.styleModifier.constructor === Array) {
      let styleModifier = "";
      context.styleModifier.forEach(m => {
        if (m) {
          if (styleModifier) {
            styleModifier += " " + m;
          } else {
            styleModifier = m;
          }
        }
      });

      return styleModifier;
    }
  });

  Handlebars.registerHelper('scriptOpen', function () {
    return new Handlebars.SafeString('<script type="text/javascript">');
  });

  Handlebars.registerHelper('scriptClose', function () {
    return new Handlebars.SafeString('</script>');
  });

  Handlebars.registerHelper('plOnly', function () {
    return new Handlebars.SafeString('<!-- Pattern Lab Only -->');
  });

  Handlebars.registerHelper('getTitle', function (context) {
    if (context.page?.title) {
      return context.page.title;
    }

    if (context.patternPartial) {
      const partials = context.patternPartial.split('-');
      const patternType = (partials[0].charAt(0).toUpperCase() + partials[0].slice(1))
        .replace('Atoms', 'Atom')
        .replace('Molecules', 'Molecule')
        .replace('Organisms', 'Organism')
        .replace('Templates', 'Template')
        .replace('Pages', 'Page');
      const patternName = partials
        .slice(1)
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');
      return patternName + ' - ' + patternType;
    }

    return "Title ipsum dolor sit (39 characters)";
  });
};
