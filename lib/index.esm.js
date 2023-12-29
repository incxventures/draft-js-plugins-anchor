import React, { useState, useRef, useEffect } from 'react';
import EditorUtils from '@draft-js-plugins/utils';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import prependHttp from 'prepend-http';
import tlds from 'tlds';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  entityKey: PropTypes.string,
  getEditorState: PropTypes.func.isRequired
};
var Link = function Link(_ref) {
  var children = _ref.children,
    className = _ref.className,
    entityKey = _ref.entityKey,
    getEditorState = _ref.getEditorState,
    target = _ref.target;
  var entity = getEditorState().getCurrentContent().getEntity(entityKey);
  var entityData = entity ? entity.getData() : undefined;
  var href = entityData && entityData.url || undefined;
  return /*#__PURE__*/React.createElement("a", {
    className: className,
    title: href,
    href: href,
    target: target,
    rel: "noopener noreferrer"
  }, children);
};
Link.propTypes = propTypes;
var DefaultLink = Link;

var v4 = '(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}';
var v6seg = '[0-9a-fA-F]{1,4}';
var v6 = ("\n(\n(?:" + v6seg + ":){7}(?:" + v6seg + "|:)|                                // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:" + v6seg + ":){6}(?:" + v4 + "|:" + v6seg + "|:)|                         // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:" + v6seg + ":){5}(?::" + v4 + "|(:" + v6seg + "){1,2}|:)|                 // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:" + v6seg + ":){4}(?:(:" + v6seg + "){0,1}:" + v4 + "|(:" + v6seg + "){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:" + v6seg + ":){3}(?:(:" + v6seg + "){0,2}:" + v4 + "|(:" + v6seg + "){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:" + v6seg + ":){2}(?:(:" + v6seg + "){0,3}:" + v4 + "|(:" + v6seg + "){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:" + v6seg + ":){1}(?:(:" + v6seg + "){0,4}:" + v4 + "|(:" + v6seg + "){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::((?::" + v6seg + "){0,5}:" + v4 + "|(?::" + v6seg + "){1,7}|:))           // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(%[0-9a-zA-Z]{1,})?                                           // %eth0            %1\n").replace(/\s*\/\/.*$/gm, '').replace(/\n/g, '').trim();
var ipRegex = function ipRegex(opts) {
  return opts && opts.exact ? new RegExp("(?:^" + v4 + "$)|(?:^" + v6 + "$)") : new RegExp("(?:" + v4 + ")|(?:" + v6 + ")", 'g');
};
ipRegex.v4 = function (opts) {
  return opts && opts.exact ? new RegExp("^" + v4 + "$") : new RegExp(v4, 'g');
};
ipRegex.v6 = function (opts) {
  return opts && opts.exact ? new RegExp("^" + v6 + "$") : new RegExp(v6, 'g');
};
function urlRegex(_opts) {
  var opts = Object.assign({
    strict: true
  }, _opts);
  var protocol = "(?:(?:[a-z]+:)?//)" + (opts.strict ? '' : '?');
  var auth = '(?:\\S+(?::\\S*)?@)?';
  var ip = ipRegex.v4().source;
  var host = "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)";
  var domain = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*";
  var tld = "(?:\\." + (opts.strict ? "(?:[a-z\\u00a1-\\uffff]{2,})" : "(?:" + tlds.sort(function (a, b) {
    return b.length - a.length;
  }).join('|') + ")") + ")\\.?";
  var port = '(?::\\d{2,5})?';
  var path = '(?:[/?#][^\\s"]*)?';
  var regex = "(?:" + protocol + "|www\\.)" + auth + "(?:localhost|" + ip + "|" + host + domain + tld + ")" + port + path;
  return opts.exact ? new RegExp("(?:^" + regex + "$)", 'i') : new RegExp(regex, 'ig');
}

var mailRegex = (function () {
  return /^((mailto:[^<>()/[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
});

var URLUtils = {
  isUrl: function isUrl(text) {
    return urlRegex().test(text);
  },
  isMail: function isMail(text) {
    return mailRegex().test(text);
  },
  normaliseMail: function normaliseMail(email) {
    if (email.toLowerCase().startsWith('mailto:')) {
      return email;
    }
    return "mailto:" + email;
  },
  normalizeUrl: function normalizeUrl(url) {
    return prependHttp(url);
  }
};

var AddLinkForm = function AddLinkForm(props) {
  var _useState = useState(''),
    value = _useState[0],
    setValue = _useState[1];
  var _useState2 = useState(false),
    isValid = _useState2[0],
    setIsValid = _useState2[1];
  var input = useRef(null);
  useEffect(function () {
    input.current.focus();
  }, []);
  var isUrl = function isUrl(urlValue) {
    if (props.validateUrl) {
      return props.validateUrl(urlValue);
    }
    return URLUtils.isUrl(urlValue);
  };
  var onChange = function onChange(event) {
    var newValue = event.target.value;
    setIsValid(isUrl(URLUtils.normalizeUrl(newValue)));
    setValue(newValue);
  };
  var onClose = function onClose() {
    return props.onOverrideContent(undefined);
  };
  var submit = function submit() {
    var getEditorState = props.getEditorState,
      setEditorState = props.setEditorState;
    var url = value;
    if (!URLUtils.isMail(URLUtils.normaliseMail(url))) {
      url = URLUtils.normalizeUrl(url);
      if (!isUrl(url)) {
        setIsValid(false);
        return;
      }
    } else {
      url = URLUtils.normaliseMail(url);
    }
    setEditorState(EditorUtils.createLinkAtSelection(getEditorState(), url));
    input.current.blur();
    onClose();
  };
  var onKeyDown = function onKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    }
  };
  var theme = props.theme,
    placeholder = props.placeholder;
  var className = isValid ? theme.input : clsx(theme.input, theme.inputInvalid);
  return /*#__PURE__*/React.createElement("input", {
    className: className,
    onBlur: onClose,
    onChange: onChange,
    onKeyDown: onKeyDown,
    placeholder: placeholder,
    ref: input,
    type: "text",
    value: value
  });
};
AddLinkForm.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  getEditorState: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  setEditorState: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  validateUrl: PropTypes.func
};
AddLinkForm.defaultProps = {
  placeholder: 'Enter a URL and press enter'
};
var AddLinkForm$1 = AddLinkForm;

var LinkButton = function LinkButton(_ref) {
  var ownTheme = _ref.ownTheme,
    placeholder = _ref.placeholder,
    onOverrideContent = _ref.onOverrideContent,
    validateUrl = _ref.validateUrl,
    theme = _ref.theme,
    onRemoveLinkAtSelection = _ref.onRemoveLinkAtSelection,
    store = _ref.store,
    InnerLinkButton = _ref.linkButton;
  var onAddLinkClick = function onAddLinkClick(event) {
    event.preventDefault();
    event.stopPropagation();
    var content = function content(contentProps) {
      return /*#__PURE__*/React.createElement(AddLinkForm$1, _extends({}, contentProps, {
        placeholder: placeholder,
        theme: ownTheme,
        validateUrl: validateUrl
      }));
    };
    onOverrideContent(content);
  };
  var editorState = store.getEditorState == null ? void 0 : store.getEditorState();
  var hasLinkSelected = editorState ? EditorUtils.hasEntity(editorState, 'LINK') : false;
  return /*#__PURE__*/React.createElement(InnerLinkButton, {
    onRemoveLinkAtSelection: onRemoveLinkAtSelection,
    hasLinkSelected: hasLinkSelected,
    onAddLinkClick: onAddLinkClick,
    theme: theme,
    store: store
  });
};
LinkButton.propTypes = {
  placeholder: PropTypes.string,
  store: PropTypes.object.isRequired,
  ownTheme: PropTypes.object.isRequired,
  onRemoveLinkAtSelection: PropTypes.func.isRequired,
  validateUrl: PropTypes.func
};
var LinkButton$1 = LinkButton;

var matchesEntityType = function matchesEntityType(type) {
  return type === 'LINK';
};
function strategy(contentBlock, callback, contentState) {
  if (!contentState) return;
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && matchesEntityType(contentState.getEntity(entityKey).getType());
  }, callback);
}

var defaultTheme = {
  input: "i1qh9dya",
  inputInvalid: "i119ugvj",
  link: "lit0q4h"
};

function DefaultLinkButton(_ref) {
  var hasLinkSelected = _ref.hasLinkSelected,
    onRemoveLinkAtSelection = _ref.onRemoveLinkAtSelection,
    onAddLinkClick = _ref.onAddLinkClick,
    theme = _ref.theme;
  var className = clsx(theme == null ? void 0 : theme.button, hasLinkSelected && (theme == null ? void 0 : theme.active));
  return /*#__PURE__*/React.createElement("div", {
    className: theme == null ? void 0 : theme.buttonWrapper,
    onMouseDown: function onMouseDown(event) {
      event.preventDefault();
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: className,
    onClick: hasLinkSelected ? onRemoveLinkAtSelection : onAddLinkClick,
    type: "button",
    "aria-label": "create hypertext link"
  }, /*#__PURE__*/React.createElement("svg", {
    height: "24",
    viewBox: "0 0 24 24",
    width: "24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
  }))));
}

var index = (function (config) {
  if (config === void 0) {
    config = {};
  }
  var _config = config,
    _config$theme = _config.theme,
    theme = _config$theme === void 0 ? defaultTheme : _config$theme,
    placeholder = _config.placeholder,
    Link = _config.Link,
    linkTarget = _config.linkTarget,
    validateUrl = _config.validateUrl,
    linkButton = _config.LinkButton;
  var store = {
    getEditorState: undefined,
    setEditorState: undefined
  };
  var DecoratedDefaultLink = function DecoratedDefaultLink(props) {
    return /*#__PURE__*/React.createElement(DefaultLink, _extends({}, props, {
      className: theme.link,
      target: linkTarget
    }));
  };
  var DecoratedLinkButton = function DecoratedLinkButton(props) {
    return /*#__PURE__*/React.createElement(LinkButton$1, _extends({}, props, {
      ownTheme: theme,
      store: store,
      placeholder: placeholder,
      onRemoveLinkAtSelection: function onRemoveLinkAtSelection() {
        return store.setEditorState(EditorUtils.removeLinkAtSelection(store.getEditorState()));
      },
      validateUrl: validateUrl,
      linkButton: linkButton || DefaultLinkButton
    }));
  };
  return {
    initialize: function initialize(_ref) {
      var getEditorState = _ref.getEditorState,
        setEditorState = _ref.setEditorState;
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    },
    decorators: [{
      strategy: strategy,
      component: Link || DecoratedDefaultLink
    }],
    LinkButton: DecoratedLinkButton
  };
});

export { index as default, defaultTheme };
