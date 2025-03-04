var dialogCheckIntervalHandler;

jQuery(window).ready(function($) {
  jQuery.fn.tzCheckbox = function(options) {
    options = jQuery.extend(
      {
        labels: ['ON', 'OFF']
      },
      options
    );

    return this.each(function() {
      var originalCheckBox = jQuery(this),
        labels = [];
      if (originalCheckBox.data('on')) {
        labels[0] = originalCheckBox.data('on');
        labels[1] = originalCheckBox.data('off');
      } else labels = options.labels;
      var checkBox = jQuery('<span>');
      checkBox.addClass(this.checked ? ' tzCheckBox checked' : 'tzCheckBox');
      checkBox.prepend(
        '<span class="tzCBContent">' + labels[this.checked ? 0 : 1] + '</span><span class="tzCBPart"></span>'
      );
      checkBox.insertAfter(originalCheckBox.hide());

      checkBox.click(function() {
        checkBox.toggleClass('checked');
        var isChecked = checkBox.hasClass('checked');
        originalCheckBox.attr('checked', isChecked);
        checkBox.find('.tzCBContent').html(labels[isChecked ? 0 : 1]);
      });

      originalCheckBox.bind('change', function() {
        checkBox.click();
      });
    });
  };

  jQuery('#state').tzCheckbox({ labels: ['On', 'Off'] });
  var vColorPickerOptions = {
    defaultColor: false,
    change: function(event, ui) {},
    clear: function() {},
    hide: true,
    palettes: true
  };

  jQuery('#body_bg_color, #font_color, #body_bg_blur_color, #controls_bg_color').wpColorPicker(vColorPickerOptions);

  if (jQuery('.select2_customize, .multiple-select-mt').length > 0) {
    jQuery('.select2_customize, .multiple-select-mt').select2({});
  }

  if (jQuery('#503_enabled').length > 0) {
    if (jQuery('#503_enabled').prop('checked')) {
      jQuery('#gg_analytics_id').prop('disabled', true);
    } else {
      jQuery('#gg_analytics_id').prop('disabled', false);
    }
  }

  jQuery('#503_enabled').on('change', function() {
    if (jQuery(this).prop('checked')) {
      jQuery('#gg_analytics_id').prop('disabled', true);
    } else {
      jQuery('#gg_analytics_id').prop('disabled', false);
    }
  });

  jQuery('#show-all-themes').on('click', function(e) {
    e.preventDefault();

    jQuery(this)
      .parent()
      .hide();
    jQuery('.theme-thumb.hidden').removeClass('hidden');

    return false;
  });

  if (localStorage.getItem('maintenance-review-top-hide')) {
    jQuery('#review-top').hide();
  } else {
    jQuery('#review-top').show();
  }
  if (localStorage.getItem('maintenance-promo-review-hide')) {
    jQuery('#promo-review2').hide();
  } else {
    jQuery('#promo-review2').show();
  }
  jQuery('.hide-review-box').on('click', function(e) {
    e.preventDefault();

    jQuery('#review-top').hide();
    localStorage.setItem('maintenance-review-top-hide', true);

    return false;
  });
  jQuery('.hide-review-box2').on('click', function(e) {
    e.preventDefault();

    jQuery('#promo-review2').hide();
    localStorage.setItem('maintenance-promo-review-hide', true);

    return false;
  });

  $('#smush_support').on('click change', function(e) {
    e.preventDefault();
    $(this).prop("checked", false);

    $('.smush-thickbox').first().trigger('click');

    return false;
  });

  jQuery('.install-wpfssl').on('click',function(e){
    if (!confirm('The free WP Force SSL plugin will be installed & activated from the official WordPress repository.')) {
      return;
    }

    jQuery('body').append('<div style="width:550px;height:450px; position:fixed;top:10%;left:50%;margin-left:-275px; color:#444; background-color: #fbfbfb;border:1px solid #DDD; border-radius:4px;box-shadow: 0px 0px 0px 4000px rgba(0, 0, 0, 0.85);z-index: 9999999;"><iframe src="' + mtnc.wpfssl_install_url + '" style="width:100%;height:100%;border:none;" /></div>');
    jQuery('#wpwrap').css('pointer-events', 'none');
    e.preventDefault();
    return false;
  });

  $('.toplevel_page_maintenance').on('click', '.open-weglot-upsell', function(e) {
    e.preventDefault();

    $(this).blur();

    $('#weglot-upsell-dialog').dialog('open');

    return false;
  });

  $('#weglot').on('click change', function(e) {
    e.preventDefault();
    $(this).prop("checked", false);

    $('.open-weglot-upsell').first().trigger('click');

    return false;
  });

  $('#weglot-upsell-dialog').dialog({'dialogClass': 'wp-dialog mtnc-dialog weglot-upsell-dialog',
                              'modal': 1,
                              'resizable': false,
                              'title': 'Translate your maintenance page to any language',
                              'zIndex': 9999,
                              'width': 550,
                              'height': 'auto',
                              'show': 'fade',
                              'hide': 'fade',
                              'open': function(event, ui) {
                                mtnc_fix_dialog_close(event, ui);
                                $(this).siblings().find('span.ui-dialog-title').html(mtnc.weglot_dialog_upsell_title);
                              },
                              'close': function(event, ui) { },
                              'autoOpen': false,
                              'closeOnEscape': true
  });
  $(window).resize(function(e) {
    $('#weglot-upsell-dialog').dialog("option", "position", {my: "center", at: "center", of: window});
  });


  jQuery('#install-weglot').on('click',function(e){
    $('#weglot-upsell-dialog').dialog('close');
    jQuery('body').append('<div style="width:550px;height:450px; position:fixed;top:10%;left:50%;margin-left:-275px; color:#444; background-color: #fbfbfb;border:1px solid #DDD; border-radius:4px;box-shadow: 0px 0px 0px 4000px rgba(0, 0, 0, 0.85);z-index: 9999999;"><iframe src="' + mtnc.weglot_install_url + '" style="width:100%;height:100%;border:none;" /></div>');
    jQuery('#wpwrap').css('pointer-events', 'none');
    e.preventDefault();
    return false;
  });

  function mtnc_fix_dialog_close(event, ui) {
    jQuery('.ui-widget-overlay').bind('click', function(){
      jQuery('#' + event.target.id).dialog('close');
    });
  } // mtnc_fix_dialog_close

  wp.codeEditor.initialize(jQuery('#custom_css'), mtnc.cm_settings);

  var t = null,
    t = jQuery.getJSON(mtnc.path + 'includes/fonts/fonts.json');
  jQuery('#body_font_family').on('change', function() {
    var e = jQuery(this).val();
    n(e);
  });
  var n = function(e) {
    jQuery('#body_font_subset').html(''),
      jQuery('#s2id_body_font_subset .select2-choice .select2-chosen').empty(),
      (font = JSON.parse(t.responseText));
    for (var n in font)
      if (n == e)
        for (var o = 0; o < font[n].variants.length; o++)
          0 == o && jQuery('#s2id_body_font_subset .select2-choice .select2-chosen').append(font[n].variants[o]),
            jQuery('#body_font_subset').append('<option>' + font[n].variants[o] + '</option>');
  };

  /******************* */

  var dialogForNewInfo;
  var dialogForNewInfoForm;
  var emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  var nameField = $( "#name" );
  var emailField = $( "#email" );
  var allFields = $( [] ).add( nameField ).add( emailField );
  var validateTips = $( ".validateTips" );

  function updateTips( t ) {
    if ( t === '') {
      validateTips
          .text( t )
          .removeClass( "ui-state-highlight" );
      return;
    }
    validateTips
        .text( t )
        .addClass( "ui-state-highlight" );
  }

  function checkLength( o, n, min, max ) {
    if ( o.val().length > max || o.val().length < min ) {
      o.addClass( "ui-state-error" );
      updateTips( "Length of the " + n + " must be between " +
          min + " and " + max + " characters." );
      return false;
    } else {
      return true;
    }
  }

  function checkRegexp( o, regexp, n ) {
    if ( !( regexp.test( o.val() ) ) ) {
      o.addClass( "ui-state-error" );
      updateTips( n );
      return false;
    } else {
      return true;
    }
  }

  function submitUserInfo() {
    var valid = true;
    updateTips('');
    allFields.removeClass( "ui-state-error" );
    valid = valid && checkLength( nameField, "name", 3, 30 );
    valid = valid && checkLength( emailField, "email", 6, 30 );

    valid = valid && checkRegexp( nameField, /^[a-z]([a-z\s])+$/i, "Name may consist of a-z, spaces and must begin with a letter." );
    valid = valid && checkRegexp( emailField, emailRegex, "Please enter a valid email address" );

    if ( valid ) {
      document.cookie = 'SameSite=None; Secure';
      var dt = new Date();
      $.ajax({
        url: 'https://wpmaintenancemode.com/get-emails/submit.php',
        method: 'POST',
        crossDomain: true,
        data: { name: nameField.val(), email: emailField.val(), site_url: mtnc.site_url, timestamp: dt.toISOString() }
      })
      .done(function(response) {
        alert('Thank you for trusting us with your email. We\'ll let you know as soon as the new version of the plugin is available!');
        dismissAskForInfoPopUp();
        //console.log(response);
      })
      .fail(function(error) {
        //alert('Sorry, something is not right :( Please try again later.');console.log(error);
        alert('Sorry, something is not right :( Please try again later.');
      }).always(function() {
        dialogForNewInfo.dialog( "close" );
      })
    }

    return valid;
  }

  $('.dismiss-new-dialog').on('click', function(e) {
    e.preventDefault();

    dismissAskForInfoPopUp();

    return false;
  });

  $('.submit-new-dialog').on('click', function(e) {
    e.preventDefault();

    submitUserInfo();

    return false;
  });

  function dismissAskForInfoPopUp() {
    $.ajax({url: mtnc.dismiss_dialog_link, method: 'GET'});
    dialogForNewInfo.dialog( "close" );
  }

  dialogForNewInfo = $( "#dialog-form-new-info" ).dialog({
    autoOpen: false,
    'dialogClass': 'wp-dialog new-version-dialog no-close',
    _height: 417,
    width: 700,
    closeOnEscape: false,
    modal: true,
    _buttons: {
      "I want to be the first to know about the new version": submitUserInfo,
      "I'm not interested": dismissAskForInfoPopUp,
      /*'Cancel': function() {
        dialogForNewInfo.dialog( "close" );
      },*/

    },
    close: function() {
      dialogForNewInfoForm[ 0 ].reset();
      allFields.removeClass( "ui-state-error" );
    }
  });

  dialogForNewInfoForm = dialogForNewInfo.find( "form#dialog-form-new-info-form" ).on( "submit", function( event ) {
    event.preventDefault();
    submitUserInfo();
  });

  $( "#test-btn-dialog" ).button().on( "click", function() {
    dialogForNewInfo.dialog( "open" );
  });

  function checkIfHasToShowDialog() {
    var serverTime = getServerTime($);
    var serverTimeTimeStamp = getTimestamp(serverTime);

    if (mtnc.first_install_date < serverTimeTimeStamp) {
      stopDialogInterval();
      dialogForNewInfo.dialog( "open" );
    }
  }

  if (mtnc.isDialogDismiss == 0) {
    dialogCheckIntervalHandler = setInterval(checkIfHasToShowDialog, 60000);
    checkIfHasToShowDialog();
  }

  $('#wpwrap').on('click', '.open-pro-dialog', function (e) {
    e.preventDefault();
    $(this).blur();

    pro_feature = $(this).data('pro-feature');
    if (!pro_feature) {
      pro_feature = $(this).parent('label').attr('for');
    }
    open_upsell(pro_feature);

    return false;
  });

  $('#mtnc-pro-dialog').dialog({
    dialogClass: 'wp-dialog mtnc-pro-dialog',
    modal: true,
    resizable: false,
    width: 850,
    height: 'auto',
    show: 'fade',
    hide: 'fade',
    close: function (event, ui) {},
    open: function (event, ui) {
      $(this).siblings().find('span.ui-dialog-title').html('Maintenance PRO is here!');
      maintenance_fix_dialog_close(event, ui);
    },
    autoOpen: false,
    closeOnEscape: true,
  });

  function open_upsell(feature) {
    feature = clean_feature(feature);

    $('#mtnc-pro-dialog').dialog('open');

    $('#mtnc-pro-table .button-buy').each(function (ind, el) {
      tmp = $(el).data('href-org');
      tmp = tmp.replace('pricing-table', feature);
      $(el).attr('href', tmp);
    });
  } // open_upsell

  function clean_feature(feature) {
    feature = feature || 'free-plugin-unknown';
    feature = feature.toLowerCase();
    feature = feature.replace(' ', '-');

    return feature;
  }

  if (window.localStorage.getItem('mtnc_upsell_shown') != 'true') {
    open_upsell('welcome');

    window.localStorage.setItem('mtnc_upsell_shown', 'true');
    window.localStorage.setItem('mtnc_upsell_shown_timestamp', new Date().getTime());
  }

  if (window.location.hash == '#open-pro-dialog') {
    open_upsell('url-hash');
    window.location.hash = '';
  }
});

function maintenance_fix_dialog_close(event, ui) {
  jQuery('.ui-widget-overlay').bind('click', function(){
    jQuery('#' + event.target.id).dialog('close');
  });
} // maintenance_fix_dialog_close


/*
Servers normally has a different time from browser... We need server side datetime to make some checks
 */
function getServerTime($) {
  return $.ajax({async: false}).getResponseHeader( 'Date' );
}

/*
we need timestamps... It's more fast to compare
 */
function getTimestamp(strDate){
  var datum = Date.parse(strDate);
  return datum/1000;
}

function stopDialogInterval() {
  clearInterval(dialogCheckIntervalHandler);
}
