var tierOneStudentText;

jQuery(function($) {
  focusFirstField();
  setupProfessions();
  setupPopovers();
  countrySelections();
  //$('#personal-edit-link').click();
  $('.email-edit-link').on('click', (function(event) {
    var savedText = $('.email-edit-link').attr("rel");
    if (!savedText) {
    }
    $('.email-edit-link').addClass('disabled');
    $('.email-edit-link').html(savedText);
    event.preventDefault();
  }));

  // enableSubmitForm();
  $('button#submit-event-form').on('click', function() {
    $('form#event-form').submit();
  });

  $('#reset-password-button').on('click', function() {
    $(this).prop('disabled', true);
    $('#passwordUpdate').submit();
  });

  $('.personal-save-button').on('click', function() {
    $(this).prop('disabled', true);
	$( "#personal-data-container input, select, option" ).prop( "disabled", false );
	$(this).append('<img id="saving"  src="/myaccount/images/ajax-loader.gif"/>');
	keepOnlyCorrectCountryForSelectedCountry();
    $('#personalData').submit();
  });

  $("#languageSelector").on('click', function() {
    displayLanguageSelection();
    return false;
  });
  
  $("#edit-address-button").on('click', function() {
		$( "#personal-data-container input, select, option" ).prop( "disabled", false );
		$(".address-fields").find(".control-label,input,select, option").css("cssText", "color: #333333 !important");
	  });
});

function keepOnlyCorrectCountryForSelectedCountry(){
    var country = $('#country-text').val();
    if (country == 'US') {
    	$('#county-text').val('');
    	$('#br-state-text').find('option:eq(0)').prop('selected', true);
    	$('#ca-state-text').find('option:eq(0)').prop('selected', true);
    }
    else if(country=="BR"){
    	$('#county-text').val('');
    	$('#us-state-text').find('option:eq(0)').prop('selected', true);
    	$('#ca-state-text').find('option:eq(0)').prop('selected', true);
    }
    else if(country=="CA"){
    	$('#county-text').val('');
    	$('#us-state-text').find('option:eq(0)').prop('selected', true);
    	$('#br-state-text').find('option:eq(0)').prop('selected', true);
    }else{
    	$('#us-state-text').find('option:eq(0)').prop('selected', true);
    	$('#br-state-text').find('option:eq(0)').prop('selected', true);
    	$('#ca-state-text').find('option:eq(0)').prop('selected', true);
    }

}
function displayLanguageSelection() {
  var languageSelector = $("#languageSelector");
  var pos = languageSelector.position();
  var posTop = pos.top + languageSelector.outerHeight() + 5;
  var posLeft = pos.left;
  $("#languageList").css({
    position: "absolute",
    top: posTop,
    left: posLeft
  }).toggle();
}


function focusFirstField() {
  var topIndex = null;

  var fields = jQuery(":input:visible:not(:submit):not(:button)");

  if (fields.size() > 0)
    topIndex = 0;

  for (var i = 1; i < fields.size(); i++) {
    if (fields[i].offsetTop < fields[topIndex].offsetTop) {
      topIndex = i;
    }
  }

  if (topIndex != null) {
    fields.get(topIndex).focus();
  }

}

function clickedThing(e, type) {
  var el = jQuery(e.target);
  if (!el.is(type)) {
    el = el.parents(type).slice(0, 1);
  }

  return el;
}


/* Appends value from text field textField to the end of link */
function appendString(link, value) {
  link.attr('href', (link.attr('href') + value));
}

function setupPopovers() {
  // Hide popovers on focus loss
  $('.jscluetip').on("blur", function() {
    $(this).popover("hide");
  });

  $('.jscluetip:not(select)')
    .popover({
      trigger: 'focus'
    });

  // Show on left for select boxes to avoid being overwritten by the drop-down list
  $('select.jscluetip')
    .popover({
      trigger: 'click',
      placement: 'left'
    })
    .on('shown.bs.popover', function(ev) {
      $('.popover').css('opacity', 1);
    });
}

function setupProfessions() {

  // store original value for Student, 	
  if (!tierOneStudentText)
  {
	tierOneStudentText = jQuery("label[for='profession-41-checkbox']").text();
  }
	
  //alert(regJourney);
  if(!$("span").hasClass("bmj-registration") && !$("span").hasClass("bmj-journal-registration")){
	$(".profession-list li").show();
  }

  $(".profession-checkbox").each(function() {
    var $check = $(this),
      $ul = $check.nextAll("ul"),
      checked = $check.prop("checked");
    // console.log("%s: %s", $check.nextAll("label").text().trim(), checked);
    $ul.toggle(checked);
  });

  $(".profession-list").on("click", ".profession-checkbox", function(ev) {
    var $check = $(this),
      $ul = $check.nextAll("ul"),
      checked = $check.prop("checked");

    // Clear all sub-menus if we uncheck.
    if (!checked) {
      $ul.find(":checked").prop("checked", false).end().find("ul").hide();
    }

    if(checked && ( $("span").hasClass("bmj-registration") || $("span").hasClass("bmj-journal-registration"))) {
    	
    	if($check.val() == '41'){
    		$ul.find('.profession-checkbox').prop("checked", true);
    		$ul.find('.profession-checkbox').nextAll("ul").show();
    		$ul.find('.profession-checkbox').nextAll("ul").find("input[type='checkbox']").last().prop("checked", true);
    	}
    	else{
    		$ul.find('.profession-checkbox').prop("checked", true);
    	}
    }
    
	if(!$("span").hasClass("bmj-registration") && !$("span").hasClass("bmj-journal-registration")){
		$ul.toggle(checked);
	}

    // When primary care (GP/family) is selected, choose GP specialty
    if (checked && $check.val() == '154') {
      $('#specialty-text').val(22);
    }
  });
  
  if ($("span").hasClass("careers-registration")) {
	  showProfessionsForCareers();
  }
  
  if ($("span").hasClass("quality-registration")) {
	  showProfessionsForQuality();
  }
  
  if ($("span").hasClass("student-registration") || $("span").hasClass("student-journal-subscription") || $("span").hasClass("medical-student-email-alert") || $("span").hasClass("school-student-email-alert")) {
    organizeStudentProfessions();  
  } 
  
  if(!$("ul").hasClass("nav nav-tabs") && !$("span").hasClass("student-registration") && !$("span").hasClass("student-journal-subscription") && !$("span").hasClass("medical-student-email-alert") && !$("span").hasClass("school-student-email-alert")) {
	  hideNonStudentProfessions();
  }
  
}

function showProfessionsForCareers() {
	  console.log("in professions for careers");
	  // hide all the professions
	  jQuery(".profession-list [id^='profession-']").parent().hide();
	  
	  jQuery("#profession-1-checkbox").parent().show();
	  jQuery("#profession-8-checkbox").parent().show();
	  //jQuery("#profession-1-checkbox").css( "display", "none");	  
	  //jQuery("label[for='profession-1-checkbox']").css( "display", "none");
	  
	  // show all those tier 3 professions we need for doctor
	  jQuery("#profession-154-checkbox").parent().show(); // parent li
	  jQuery("#profession-154-checkbox").parent().parent().show(); // parent ul
	  jQuery("#profession-155-checkbox").parent().show(); // parent li
	  jQuery("#profession-155-checkbox").parent().parent().show(); // parent ul
	  
	  // hide children of the 2 options we are showing
	  jQuery("#profession-154-checkbox").children().hide();
	  jQuery("#profession-155-checkbox").children().hide();
}

function showProfessionsForQuality() {
	  
	  //Update the display name    
	  jQuery("label[for='profession-171-checkbox']").text("New Doctor/Intern (UK FY)");
	  jQuery("label[for='profession-154-checkbox']").text("GP/Family Physician");
	  jQuery("label[for='profession-173-checkbox']").text("Specialist/Consultant");
	  jQuery("label[for='profession-172-checkbox']").text("GP/Family Physician Trainee");
	  jQuery("label[for='profession-176-checkbox']").text("Nurse");
	  jQuery("label[for='profession-175-checkbox']").text("Nurse Specialist/Nurse Practitioner");
	  jQuery("label[for='profession-90-checkbox']").text("Pharmacist");
	  jQuery("label[for='profession-138-checkbox']").text("Paramedic");
	  jQuery("label[for='profession-42-checkbox']").text("Medical Student");
	  jQuery("label[for='profession-8-checkbox']").text("Other Healthcare Professional");
	  jQuery("label[for='profession-174-checkbox']").text("Hospital Doctor/Secondary Care Physician - Trainee");
	  
	  //List of Professions that needs to be displayed
	  var arr = [ "1", "8", "11", "14", "16", "19", "20", "22", "26", "33", "34", "35", "36", "37", "38", "41", "42", "43", "46", "55", "57", "58", "59", "60", "61", "76", "90", "97", "98", "99", "100", "138", "139", "141", "142", "143", "144", "145", "146", "147", "148", "149", "150", "154", "155", "156", "161", "162", "163", "164", "165", "166", "167", "171", "172", "173", "174", "175", "176", "179", "181", "182"];
	  
	  // hide all the professions
	  jQuery(".profession-list [id^='profession-']").parent().hide();
	  // Show only Professions that are required
	  $.each(arr , function(i, val) { 
		jQuery("#profession-"+val+"-checkbox").parent().show();
	});
}

function countrySelections() {

  function country_changed() {
    var country = $('#country-text').val();
    if(country===undefined){
    	country=$("#countryParam").val();
    }
    if (country) {
      setupProfessions();
      //Showing the same professions with UK to Australia and New Zealand as per PCMD-38
      if (country == 'GB'||country=='AU'||country=='NZ') {
    	$('#nhsPct-text').removeAttr('disabled');
        showRow('nhsPct');
        jQuery("label[for='profession-41-checkbox']").text(tierOneStudentText);
      }
      else {
        hideRow('nhsPct');
        
        if ($("span").hasClass("student-registration") || $("span").hasClass("student-journal-subscription") || $("span").hasClass("medical-student-email-alert") || $("span").hasClass("school-student-email-alert")) {
      	  organizeStudentProfessions();
        }
        else {
          hideGBProfessions();
          hideNonStudentProfessions();
        }
        
        if (country == 'US') {
          hideNonUSProfessions();
        }
        else {
          jQuery("label[for='profession-41-checkbox']").text(tierOneStudentText);
        }
      }

      if (country == 'IQ') {
        hideRow('iraqiProvince'); // ???
        hideRow('county')
      }
      else {
        hideRow('iraqiProvince');

        if ($('#content').attr('class') == 'view' || $('#label-county').find('.required').size() > 0) {
          showRow('county');
        }
        else {
          hideRow('county');
        }
      }
    }

    doSpecialCountrySelection(country);
  }

  $('#country-text').change(country_changed);
  country_changed();
}


function doSpecialCountrySelection(country) {
  // Let's figure out what page we are on - this code is a bit of a hack but works none the less.
  var currentPage = 'one';

  if ($("#about-your-profession").attr("class") == "active") {
    currentPage = 'two';
  }
  if (window.location.href.indexOf("additional-details") > -1) {
    currentPage = 'three';
  }

  // for certain pages we have to force the showing or hiding of various fields
  if (window.location.href.indexOf("home-view") > -1 ||
      window.location.href.indexOf("personal-edit.html") > -1 ||
      window.location.href.indexOf("renewal-edit.html") > -1) {
    currentPage = "forced";
  }

  // Let's see if we Brazil or US selected
  var brazilSelected = (country && country == "BR");
  var usSelected = (country && country == "US");
  var caSelected = (country && country == "CA");
  var qatarSelected = (country && country == "QA");

  // Now show or hide items depending on whether Brazil or US is the selected country or not
  if (brazilSelected) {
    // WARNING: this codes drives the display of fields in myaccount
    // if you hide a field here, but then that field is required in personal-data.xml
    // then the registration journey will be broken! A user will be ask to enter that field but it will be hidden by this js
    showRowOnPage(currentPage, "br-professional-council");
    showRowOnPage(currentPage, "br-state");
    showRowOnPage(currentPage, "br-healthcareAssociation");
    showRowOnPage(currentPage, "br-attendingUniversity");
    showRowOnPage(currentPage, "br-attendingHospital");    
    showRowOnPage(currentPage, "town");
    if (!$("span").hasClass("best-practice-bma")) {
    	hideRowOnPage(currentPage, "bma-number");
    }
    hideRowOnPage(currentPage, "us-state");
    hideRowOnPage(currentPage, "ca-state");

    hideRowOnPage(currentPage, "county");
  }
  else if(qatarSelected){
	if ($("span").hasClass("learning-registration")) { 
		hideRowOnPage(currentPage, "bma-number"); 
	}
  }    
  else if (usSelected) {
    // WARNING: this codes drives the display of fields in myaccount
    // if you hide a field here, but then that field is required in personal-data.xml
    // then the registration journey will be broken! A user will be ask to enter that field but it will be hidden by this js
    hideRowOnPage(currentPage, "br-professional-council");
    hideRowOnPage(currentPage, "br-state");
    hideRowOnPage(currentPage, "br-healthcareAssociation");
    hideRowOnPage(currentPage, "br-attendingUniversity");
    hideRowOnPage(currentPage, "br-attendingHospital");
    if (!$("span").hasClass("best-practice-bma")) {
    	hideRowOnPage(currentPage, "bma-number");
    }
    hideRowOnPage(currentPage, "ca-state");
    showRowOnPage(currentPage, "us-state");

    hideRowOnPage(currentPage, "county");
  }
  else if(caSelected){
	    hideRowOnPage(currentPage, "br-professional-council");
	    hideRowOnPage(currentPage, "br-state");
	    hideRowOnPage(currentPage, "br-healthcareAssociation");
	    hideRowOnPage(currentPage, "br-attendingUniversity");
	    hideRowOnPage(currentPage, "br-attendingHospital");
	    showRowOnPage(currentPage, "bma-number");
	    showRowOnPage(currentPage, "ca-state");
	    hideRowOnPage(currentPage, "us-state");
	    hideRowOnPage(currentPage, "county");
  }
  else {
    // WARNING: this codes drives the display of fields in myaccount
    // if you hide a field here, but then that field is required in personal-data.xml
    // then the registration journey will be broken! A user will be ask to enter that field but it will be hidden by this js
    hideRowOnPage(currentPage, "br-professional-council");
    hideRowOnPage(currentPage, "br-state");
    hideRowOnPage(currentPage, "br-healthcareAssociation");
    hideRowOnPage(currentPage, "br-attendingUniversity");
    hideRowOnPage(currentPage, "br-attendingHospital");
    hideRowOnPage(currentPage, "us-state");
    hideRowOnPage(currentPage, "ca-state");
    showRowOnPage(currentPage, "bma-number");
    showRowOnPage(currentPage, "county");
  }
}


// Gets the label and input elements for a given field
function getRow(field_name) {
  return jQuery('#data-' + field_name + ', #label-' + field_name);
}


function hideRow(rowName) {
  getRow(rowName).addClass('hidden').hide();
}


function showRow(rowName) {
  // am i in the new signup reg journey

  if ($('#data-country').hasClass('one') || $('#content').attr('class') == 'view') {
    // if it should be on the first page, show it
    if ($('#data-' + rowName).hasClass('one') || $('#content').attr('class') == 'view') {
      getRow(rowName).removeClass('hidden').show();
    }
    // otherwise just enable it, and it'll show up on page 2
    else {
      getRow(rowName).removeClass('hidden');
    }
  }
}


function showRowOnPage(expectedPage, rowName) {
  var actualPage = jQuery("#data-" + rowName).attr("class");
  if (actualPage == null || typeof actualPage === 'undefined') {
    return;
  }

  // depending on the page, some fields are forced to be shown
  if (expectedPage == "forced" || actualPage.indexOf(expectedPage) != -1) {
    getRow(rowName).removeClass('hidden').show();
  }
}


function hideRowOnPage(expectedPage, rowName) {
  var actualPage = jQuery("#data-" + rowName).attr("class");
  if (actualPage == null || typeof actualPage === 'undefined') {
    return;
  }

  // depending on the page, some fields are forced to be hidden
  if (expectedPage == "forced" || actualPage.indexOf(expectedPage) != -1) {
    getRow(rowName).addClass('hidden').hide();
  }
}


function hideGBProfessions() {
  jQuery('.profession-list .GB').parent()
    .addClass('non-gb').hide()
    .parent()
      .find('li :checkbox:checked').each(function() {
        $(this).prop('checked', false);
      });
  jQuery('.profession-list .GB').parent().parent().find('.error').hide();
}


function showGBProfessions() {
  jQuery('.profession-list .GB').parent().show();
}


function hideTierTwoProfessions() {
  hideGBProfessions();

  jQuery(".profession-list [name^='tierTwoProfession']").parent()
    .addClass('non-t1').hide()
    .parent()
      .find('li :checkbox:checked').each(function() {
        $(this).prop('checked', false);
      });
}


function hideNonUSProfessions() {
  // Student
  jQuery("label[for='profession-41-checkbox']").text("Resident");

  // Member of the public, veterinary, religious leader
  jQuery('#profession-47-checkbox, #profession-91-checkbox, #profession-160-checkbox')
    .parent()
      .hide().prop('checked', false);
}

function organizeStudentProfessions() {
	var country = $('#country-text').val();
  
	// Teacher
	jQuery("label[for='profession-34-checkbox']").text("Teacher");
  
	// hide all the professions
	jQuery(".profession-list [id^='profession-']").parent().hide();
  
	// show only those tier 1 professions we need
	if ($("span").hasClass("school-student-email-alert")) {
		jQuery("#profession-33-checkbox, #profession-41-checkbox, #profession-183-checkbox").parent().show();
		$("#profession-41-checkbox").attr('checked','checked');
		$("#profession-41-checkbox").parent().children("ul.profession-tier").show();	
	}
	else if ($("span").hasClass("medical-student-email-alert")) {
		jQuery("#profession-33-checkbox, #profession-41-checkbox, #profession-183-checkbox").parent().show();
		$("#profession-41-checkbox").attr('checked','checked');
		$("#profession-41-checkbox").parent().children("ul.profession-tier").show();
	}
    else {
    	jQuery("#profession-1-checkbox, #profession-33-checkbox, #profession-41-checkbox, #profession-183-checkbox").parent().show();
    }
	  
	// show only those tier 2 professions we need
	if ($("span").hasClass("school-student-email-alert")) {
		jQuery("#profession-42-checkbox, #profession-181-checkbox, #profession-184-checkbox, #profession-34-checkbox, #profession-182-checkbox").parent().show();
		$("#profession-184-checkbox").attr('checked','checked');
	}
	else if ($("span").hasClass("medical-student-email-alert")) {
		jQuery("#profession-42-checkbox, #profession-181-checkbox, #profession-184-checkbox, #profession-34-checkbox, #profession-182-checkbox").parent().show();
		$("#profession-42-checkbox").attr('checked','checked');
		$("#profession-42-checkbox").parent().children("ul.profession-tier").show();
	}
    else {
    	jQuery("#profession-154-checkbox, #profession-155-checkbox, #profession-42-checkbox, #profession-181-checkbox, #profession-184-checkbox, #profession-34-checkbox, #profession-182-checkbox").parent().show();
    }
	  
	// show only those tier 3 professions we need, this is for student uni years
	jQuery("#profession-129-checkbox, #profession-130-checkbox, #profession-131-checkbox, #profession-132-checkbox, #profession-133-checkbox, #profession-134-checkbox").parent().show();
	  
	// show all those tier 3 professions we need for doctor
	jQuery("#profession-154-checkbox").parent().css( "display", "list-item");
	jQuery("#profession-155-checkbox").parent().css( "display", "list-item");
	if (country == 'GB'||country=='AU'||country=='NZ') {
		jQuery("#profession-154-checkbox").parent().children("ul").children().css( "display", "list-item");
		jQuery("#profession-155-checkbox").parent().children("ul").children().css( "display", "list-item");
	}
}

function hideNonStudentProfessions() {
	  // Parent of student, school student
	  jQuery('#profession-183-checkbox, #profession-184-checkbox')
	    .parent()
	      .hide().prop('checked', false);
}