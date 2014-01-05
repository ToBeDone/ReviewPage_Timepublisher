/*
// --------------------------------------------------------------------
//
// ==UserScript==
// @name			C_ReviewPage_Timepublisher
// @namespace		ReviewPage_Timepublisher
// @version			1.21222
// @downloadURL   	https://ssl.webpack.de/eulili.de/greasemonkey/ReviewPage_Timepublisher/ReviewPage_Timepublisher.user.js
// @updateURL		http://www.eulili.de/greasemonkey/ReviewPage_Timepublisher/ReviewPage_Timepublisher.user.js
// @include			http://www.geocaching.com/admin/review.aspx*
// @include			http://www.geocaching.com/bookmarks/mark.aspx*
// @include			http://www.geocaching.com/bookmarks/default.aspx*
// @include			http://www.geocaching.com/bookmarks/view.aspx*
// @include			http://www.geocaching.com/admin/CachePublish.aspx*
// @icon			http://www.eulili.de/greasemonkey/icons/eichhoernchen.png
// @description		Timepublish-Link auf Review-Seite
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require			https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js
// @resource		jqUI_CSS    http://www.eulili.de/grease_eigene/ReviewPage_Timepublisher/jquery-ui.css
// @grant       	GM_getValue
// @grant       	GM_setValue
// @grant			GM_addStyle
// @grant          	GM_registerMenuCommand
//
//
// ==/UserScript==
//
// Versionshistorie
// ================
//	v01.00		2013-12-02 EU		Grundfunktion des Scripts eingerichtet
//	v01.01		2013-12-04 TBD  	Auswahlfeld vor Timepublish Button hinzugefügt.
//									Mit diesem Auswahlfeld kann bestimmt werden ob es sich um einen TP 
//									für "Morgen", "Wunschdatum" oder "Sonstiges" handelt. Ein passendes 
//									Template für "Morgen" und "Wunschdatum wird sofort abgeschickt. 
//									Bei "Sonstiges" stoppt das Skript "MarkPage_Timepublisher" vor der Betätigung des 
//									"Hold, Lock & Publish sodass ein individueller Text eingegeben werden kann.
//	v01.02		2013-12-04 EU		Umstellung auf "Lauf auf gleicher Seite" mit Update der Review-Seite am Ende
//	v01.03		2013-12-05 EU		Rot markieren > TimePublish auf andern Tag als "morgen" gestellt, aber "morgen" gewählt
//	v01.04		2013-12-06 EU		Datumsvorprüfungen erfasst bei nicht korrekten auswahlen
//  v01.05		2013-12-09 TBD		* Require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js hinzugefügt
//  								* @Grant in Deklaration hinzugefügt.	
//	v01.06		2013-12-11 EU		Aufgabe des Extra-Scripts "Datepicker" und kleine Anpassungen
//	v01.07		2013-12-11 EU		Aufgabe des Extra-Scripts "MarkPage_Timepublisher"
//  v01.08		2013-12-11 TBD		Wenn ein Cache bereits auf der Bookmarkliste "Timepublish" steht wird das Skript nun 
//									mit einer Fehlermeldung unterbrochen statt in einer Endlosschleife zu laufen.
//  v01.09		2013-12-11 EU TBD	Benutzerskript-Befehl Menü hinzugefügt für folgende Optionen
//									*	Verwendete Timepublish-Liste
//										Es wird nun kein statischer Name mehr für die Bokkmarkliste verwendet sondern der, der im 
//										Benutzerskript-Befehl-Menü eingestellt wurde.
//									*	Vorgehensweise wenn der Cache schon auf der Bookmark steht (Stoppen / Fortsetzen)
//										Skript stoppen: Wenn der Cache schon auf der Bookmark-Liste steht stoppt das Skript 
//										sofort ab und gibt die Fehlermeldung "Timepublish unterbrochen! Der Cache befindet sich 
//										bereits auf der Timepublish Bookmarkliste." aus.
//										Skript mit bestehendem Eintrag fortsetzen: In diesem Fall wird der Cache-Eintrag der 
//										eingestellten Bookmark-Liste verwendet um den Timepublish zu aktivieren.
//  v01.10		2013-12-12 TBD		Im Benutzerskript-Befehl Menü können jetzt auch die Templates angepasst werden, die 
//									vom Skript versendet werden.
//	v01.11		2013-12-12 EU		Anzeige immer eingeblendet lassen, aber Absendebutton ausser Funktion, wenn Cache nicht fertig
//									Abfangen von "morgen" wenn Datum <> morgen gewählt
//  v01.12		2013-12-12 TBD		Bugfix für version 01.11  
//									Das formular wird nun nur noch an den Bookmark-Link angehangen wenn dieser auch existiert.
//  v01.13		2013-12-13 TBD		Wenn das Datum für den Timepublish in der Sommerzeit liegt wird die Stunde Zeitverschiebung 
//									im Formular automatisch ausgeglichen.
//	v01.14		2013-12-13 EU		Bugfix andere Spracheinstellung als "Englisch" (geprüft mit Deutsch) und das Zeitverschiebungs-
//									script angepasst.
//  v01.15		2013-13-13 TBD		Bugfix: 
//									* Bei einem manuellen Timepublish wurde plötzlich "Cache not found angezeigt".
//									* Sommerzeit Berechnungsfehler beseitigt.
//									* Formular hatte keinen Eintrag für 5:30 Uhr und 6 Uhr.
//	v01.16		2013-12-18 EU		Statt "Freischaltung am:" nur noch "Freischaltung:" in Bookmarkeintrag (Grund: Nutzung
//									für anderes Script, welches die Bookmarkliste aufräumt *PLANUNG) Zeile 311
//  v01.17		2013-12-22 TBD		* Im Benutzerskript Befehl "Timepublisher Options" wurden zwei neue Optionen für die "Vorgehensweise wenn der Cache schon auf der ausgewählten Bookmarkliste steht" eingeführt. Die Optionen nennen sich "Bookmark aktualisieren" und "Nachfragen". Ist "Bookmark aktualisieren" ausgewählt, wird der Kommentar mit dem Datum für den Wunschtermin im entsprechenden Eintrag der Bookmarkliste aktualisiert. Die Option "Skript mit bestehendem Eintrag fortsetzen" nutzt den Eintrag der Bookmarkliste ohne den Kommentar zu aktualisieren. Wenn die Option "Nachfragen" aktiviert ist, fragt das Script per Dialog jedes mal nach was es tun soll wenn der Cache bereits auf der Bookmarkliste steht.
//									* Für die drei Template-Texte wurde eine neue Wildcard hinzugefügt. Neben dem bereits existierenden Platzhalter %SignedInAs% kann jetzt auch %CO% verwendet werden, wenn an der entsprechenden Position der Name des Cacheowners eingefügt werden soll.
//									* Bugfix: Die Wildcards %SignedInAs% und %CO% werden jetzt auch richtig ersetzt wenn sie mehrfach verwendet wurden.
//	v01.18		2013-12-22 TBD		Bugfix: Benutzerskript Befehl nicht mehr aufrufbar.
//	v01.19		2013-12-23 TBD		Bugfix: Intern (Übergabe Funktionswert für AufrufFreischalteLink fehlerhaft).
//	v01.20		2013-12-23 TBD		Bugfix: Wenn ein einstelliges Datum ausgewählt wurde brach das Skript mit der Fehlermeldung ab, da die entsprechende Case-Anweisung nur Werte wie "01","02" geprüft hat.
//	v01.21		2014-01-02 TBD		Bugfix: Wenn Sonderzeichen im Namen des CO enthalten sind bricht das Skript nicht mehr ab, oder läuft in eine Endlosschleife.
*/

// Prototyp Funktionen
// ===================
Date.prototype.DST=function()
{  
  new Date(1).getTimezoneOffset() / 60;
  return (((new Date(1).getTimezoneOffset() / 60)==(this.getTimezoneOffset() / 60))?false:true);
}

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};
// ===================


// Name des Owners von der der Review-Seite ermitteln
if		($("a[id='ctl00_ContentBody_CacheDetails_Owner']").text().length > 0) {
			var COName = $("a[id='ctl00_ContentBody_CacheDetails_Owner']").text() ;
		}

		
//  Get currently signed-on geocaching.com profile.

//var SignedInAs = $('#ctl00_LoginUrl').prev().text();

//alert ($('#ctl00_LoginUrl').prev().text()+"-"+$('.SignedInProfileLink').text());
// Abfrage als was eingeloggt
if		($('#ctl00_LoginUrl').prev().text().length > 0) {
		var SignedInAs = $('#ctl00_LoginUrl').prev().text();
		}
else if	($('.SignedInProfileLink').text().length > 0) {
		var SignedInAs = $('.SignedInProfileLink').text();
		}
else	{ 
		//alert ("Nicht eingeloggt!");
		return;
		}

//alert ($('#ctl00_LoginUrl').prev().text()+" - "+$('.SignedInProfileLink').text());
//
//var SignedInLink = document.evaluate(
//		"//a[contains(@class, 'SignedInProfileLink')]",
//		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
//		).singleNodeValue;
//if (SignedInLink) {
//	var SignedInAs = SignedInLink.firstChild.data;
//	SignedInAs = SignedInAs.replace(/<\&amp;>/g, '&');
//} else {
//	var e_LogIn = document.getElementById("ctl00_LoginUrl");
//	if (!e_LogIn) {
//		var e_LogIn = document.getElementById("Header1_urlLogin");
//	}
//	if (e_LogIn.firstChild.data != 'Log out') { return; }
//	SignedInAs = e_LogIn.parentNode.childNodes[1].firstChild.data;
//	SignedInAs = SignedInAs.replace(/<\&amp;>/g, '&');
//}

// Add Options to the Monkey Menu
GM_registerMenuCommand('Timepublisher Options', fSetOptions);

// Datum morgen berechnen
var Zeit = new Date();                          //Datum auslesen
var jetztZeit = Zeit.getTime();                 //Datum in ms umwandeln
var morgen = jetztZeit + (1000*60*60*24);       //1 Tag zurechnen in ms
Zeit.setTime(morgen);                           //Neue Zeit setzen
var Jahr = Zeit.getYear()+1900;                      //Neues Jahr auslesen
var Monat = Zeit.getMonth()+1;                  //Neuen Monat auslesen + Korrektur
var Tag = Zeit.getDate();                       //Neue Tag auslesen


if ( $('#ctl00_ContentBody_lnkBookmark').length > 0 ) {
	var LinkValue  = '<form id="BookPub" name="form1" method="post">';
		LinkValue += '  <input type="datepublish" name="datepublish" id="datepublish" value="'+Tag+"."+Monat+"."+Jahr+'"';
		LinkValue += '   title="Datum als DD.MM.YYYY">';
		LinkValue += '  <label for="Wunschzeit"> Zeit:</label>';
		LinkValue += '  <select name="Wunschzeit" id="Wunschzeit" title="Freischaltezeit auswählen">';
		LinkValue += '  	<option value="0000">00:00</option>';
		LinkValue += '  	<option value="0030">00:30</option>';
		LinkValue += '  	<option value="0100">01:00</option>';
		LinkValue += '  	<option value="0130">01:30</option>';
		LinkValue += '  	<option value="0200">02:00</option>';
		LinkValue += '  	<option value="0230">02:30</option>';
		LinkValue += '  	<option value="0300">03:00</option>';
		LinkValue += '  	<option value="0330">03:30</option>';
		LinkValue += '  	<option value="0400">04:00</option>';
		LinkValue += '  	<option value="0430">04:30</option>';
		LinkValue += '  	<option value="0500">05:00</option>';
		LinkValue += '  	<option value="0530">05:30</option>';
		LinkValue += '  	<option value="0600">06:00</option>';
		LinkValue += '  	<option value="0630">06:30</option>';
		LinkValue += '  	<option value="0700">07:00</option>';
		LinkValue += '  	<option value="0730">07:30</option>';
		LinkValue += '  	<option value="0800" selected>08:00</option>';
		LinkValue += '  	<option value="0830">08:30</option>';
		LinkValue += '  	<option value="0900">09:00</option>';
		LinkValue += '  	<option value="0930">09:30</option>';
		LinkValue += '  	<option value="1000">10:00</option>';
		LinkValue += '  	<option value="1030">10:30</option>';
		LinkValue += '  	<option value="1100">11:00</option>';
		LinkValue += '  	<option value="1130">11:30</option>';
		LinkValue += '  	<option value="1200">12:00</option>';
		LinkValue += '  	<option value="1230">12:30</option>';
		LinkValue += '  	<option value="1300">13:00</option>';
		LinkValue += '  	<option value="1330">13:30</option>';
		LinkValue += '  	<option value="1400">14:00</option>';
		LinkValue += '  	<option value="1430">14:30</option>';
		LinkValue += '  	<option value="1500">15:00</option>';
		LinkValue += '  	<option value="1530">15:30</option>';
		LinkValue += '  	<option value="1600">16:00</option>';
		LinkValue += '  	<option value="1630">16:30</option>';
		LinkValue += '  	<option value="1700">17:00</option>';
		LinkValue += '  	<option value="1730">17:30</option>';
		LinkValue += '  	<option value="1800">18:00</option>';
		LinkValue += '  	<option value="1830">18:30</option>';
		LinkValue += '  	<option value="1900">19:00</option>';
		LinkValue += '  	<option value="1930">19:30</option>';
		LinkValue += '  	<option value="2000">20:00</option>';
		LinkValue += '  	<option value="2030">20:30</option>';
		LinkValue += '  	<option value="2100">21:00</option>';
		LinkValue += '  	<option value="2130">21:30</option>';
		LinkValue += '  	<option value="2200">22:00</option>';
		LinkValue += '  	<option value="2230">22:30</option>';
		LinkValue += '  	<option value="2300">23:00</option>';
		LinkValue += '  	<option value="2330">23:30</option>';
		LinkValue += '  </select>';
		LinkValue += '  <select name="Wunschtyp" id="Wunschtyp" title="Hinweis Text-Ausgabeart zum CO">';
		LinkValue += '  	<option value="morgen" selected>Morgen</option>';
		LinkValue += '  	<option value="wunsch">Wunschdatum</option>';
		LinkValue += '  	<option value="sonstiges">Sonstiges</option>';
		LinkValue += '  </select>';	
		LinkValue += '  <input type="button" name="button" id="WunschzeitButton" value="Timepublish" >';
		LinkValue += '</form>';

		
	$('#ctl00_ContentBody_lnkBookmark').parent().after().append(LinkValue);
}



// Abfrage nach Update Datumswahl ob "morgen"
$('#datepublish').change(function () {
	if ((Tag+"."+Monat+"."+Jahr)!=$('#datepublish').val()) {
		//alert ("solL")
		$('#Wunschtyp').attr('selected',false)
		$('#Wunschtyp option[value="wunsch"]').attr('selected', true);
	}
});

// Funktion für den Klick auf den Timepublish-Button auf der Reviewer Seite
if ($('#ctl00_ContentBody_CacheDetails_Status').text().split(' ')=="(Not,Published)") {
	  $( '#WunschzeitButton' ).click(function() {
			  $('#datepublish').css('background-color','#FFFFFF');
			  $('#Wunschzeit').css('background-color','#FFFFFF');
			  $('#Wunschtyp').css('background-color','#FFFFFF');
			  Bookmark_Link			= $('#ctl00_ContentBody_lnkBookmark').attr('href');
			  Wunschzeit				= $('#Wunschzeit option:selected').val();
			  WunschDatum				= $('#datepublish').val();
			  WunschGCCode			= $('#ctl00_ContentBody_CacheDetails_WptRef').text();
			  TPTyp					= $('#Wunschtyp option:selected').val();
			  var AufgDatum			= WunschDatum.split(".");
			  var WZeitH = (Wunschzeit/100).toFixed(0);
			  var WZeitM = (((Wunschzeit/100)-((Wunschzeit/100).toFixed(0)))*100).toFixed(0);
			  var NameOfParam = "Timepublisher_BmLName_COName";
			  
		  var PruefZeit1 = new Date(AufgDatum[2],(AufgDatum[1]-1),AufgDatum[0],WZeitH,WZeitM);
		  
		  if (((Tag+"."+Monat+"."+Jahr)==$('#datepublish').val()) &&
			  ($('#Wunschtyp option:selected').val()=='morgen')) {
				  GM_setValue(NameOfParam, COName);
				  AufrufFreischalteLink(Bookmark_Link,Wunschzeit,WunschDatum,TPTyp,WunschGCCode,COName);
			  }
		  else if (jetztZeit>PruefZeit1.getTime()) {
				  $('#datepublish').css('background-color','#FF0000');
				  $('#Wunschzeit').css('background-color','#FF0000');
				  alert ("Die gewünschte Freischaltezeit liegt in der Vergangenheit");
			  }
		  else if (((Tag+"."+Monat+"."+Jahr)!=$('#datepublish').val()) &&
			  ($('#Wunschtyp option:selected').val()=='morgen')) {
				  $('#datepublish').css('background-color','#FF0000');
				  $('#Wunschtyp').css('background-color','#FF0000');
				  alert ("Bitte nochmals prüfen, da morgen nicht der "+$('#datepublish').val()+" ist.");
			  }
		  else {
		  	  GM_setValue(NameOfParam, COName);
			  AufrufFreischalteLink(Bookmark_Link,Wunschzeit,WunschDatum,TPTyp,WunschGCCode,COName);
		  }
	  });
} else {
		$( '#WunschzeitButton' ).css('background-color','rgba(190,190,190,1)');
		$( '#WunschzeitButton' ).attr('title','Cache ist nicht im freischaltbaren Status');
}

// Styles einfügen
$('#BookPub').css({
	'background-color':'rgba(159,255,167,1.00)',
	'padding-left':'2px',
	'padding-top':'1px',
	'padding-bottom':'1px'
});
$('#datepublish').css({
	'width':'70px',
	'text-align':'right'
});



//--- Add datepicker popups to select inputs:
$("#datepublish").datepicker ({ dateFormat: "d.mm.yy" , showButtonPanel: false});
$("#datepublish").click ( function () {
    setTimeout (cleanUpCrappyEventHandling, 100);
} );



// Schleife wenn die Bookmarkseite aufgerufen wird
if (UrlParm('PTIME')&&UrlParm('PDATE')&&UrlParm('PGCCODE')&&!UrlParm('SBM')) {
	var VergleichString = "Thanks! Your bookmark was created. You can visit the Bookmark List to see your changes.";
	var VergleichString1 = "This bookmark already exists for this list.";
	var VergleichString2 = "Thanks! Your bookmark has been changed. You can visit the Bookmark List to see your changes.";
	
	//alert ( $('#ctl00_divContentMain .Success').text() );
	
	if ($('#ctl00_divContentMain .Success').text() == VergleichString || 
			   $('#ctl00_divContentMain .Success').text() == VergleichString2) {
		var	WeiterleitungsLink  = $('#ctl00_divContentMain .Success a').attr('href');
			WeiterleitungsLink += "&PTIME="+UrlParm('PTIME')+"&PDATE="+UrlParm('PDATE');
			WeiterleitungsLink += "&TPTyp="+UrlParm('TPTyp');
			WeiterleitungsLink += "&COName="+UrlParm('COName');
			WeiterleitungsLink += "&PGCCODE="+UrlParm('PGCCODE')+"&SBM=START";
		window.location.href= WeiterleitungsLink;
	} else {
			if (($('#ctl00_ContentBody_Bookmark_ValidationSummary1').text()).contains(VergleichString1)) {
				var vBmLStop_val = GM_getValue('Timepublisher_BmLStop_' + SignedInAs, 'stop');
				
				switch (vBmLStop_val) {
				 
				case "stop":
					alert("Timepublish unterbrochen! Der Cache befindet sich bereits auf der Timepublish Bookmarkliste.");
					return;
					break;
				
				case "cont":
					// Aufruf der Bookmarkseite http://www.geocaching.com/bookmarks/default.aspx mit Parameter (damit der Aufruf vom Skript identifiziert werden kann.
					WeiterleitungsLink  = "http://www.geocaching.com/bookmarks/default.aspx?";
					WeiterleitungsLink += "&PTIME="+UrlParm('PTIME')+"&PDATE="+UrlParm('PDATE');
					WeiterleitungsLink += "&TPTyp="+UrlParm('TPTyp')+"&COName="+UrlParm('COName');
					WeiterleitungsLink += "&PGCCODE="+UrlParm('PGCCODE')+"&mod=findguid";
					window.location.href= WeiterleitungsLink;
					return;
					break;
				
				case "aktu":
					//#ctl00_ContentBody_Bookmark_ValidationSummary1 > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)
					var WeiterleitungsLink = $("div#ctl00_ContentBody_Bookmark_ValidationSummary1 :nth-child(1) :nth-child(1) :nth-child(1)").attr('href') ;
					WeiterleitungsLink += "&PTIME="+UrlParm('PTIME')+"&PDATE="+UrlParm('PDATE');
					WeiterleitungsLink += "&TPTyp="+UrlParm('TPTyp')+"&COName="+UrlParm('COName');
					WeiterleitungsLink += "&PGCCODE="+UrlParm('PGCCODE')+"&mod=findguid";
					window.location.href= WeiterleitungsLink;
					return;
					break;
				
				case "fragen":
					Check1 = confirm("Es besteht bereits ein Eintrag für diesen Cache in der ausgewählten Bookmarkliste. Soll das Skript trotzdem fortgesetzt werden?");
					if (Check1 == true)	{
						Check2 = confirm("Soll der Kommentar des bestehenden Bookmark-Eintrages auf die ausgewählte Zeit aktualisiert werden?");
							if (Check2 == true)	{
								// Siehe "aktu"
								var WeiterleitungsLink = $("div#ctl00_ContentBody_Bookmark_ValidationSummary1 :nth-child(1) :nth-child(1) :nth-child(1)").attr('href') ;
							}
							else {
								// siehe "cont"
								var WeiterleitungsLink  = "http://www.geocaching.com/bookmarks/default.aspx?";
							}
							WeiterleitungsLink += "&PTIME="+UrlParm('PTIME')+"&PDATE="+UrlParm('PDATE');
							WeiterleitungsLink += "&TPTyp="+UrlParm('TPTyp')+"&COName="+UrlParm('COName');
							WeiterleitungsLink += "&PGCCODE="+UrlParm('PGCCODE')+"&mod=findguid";
							window.location.href= WeiterleitungsLink;
						}
					return;
					break;
				
				default:
					alert("Es ist ein unerwarteter Fehler aufgetreten. Bitte Benutzerskript-Befehle -> Timepublisher Options öffnen, Einstellungen festlegen und abspeichern.");
					return;
				}
			}
			var vBmLName_val = GM_getValue('Timepublisher_BmLName_' + SignedInAs, 'Timepublish');
			$('#ctl00_ContentBody_Bookmark_ddBookmarkList > option:selected')
				.attr('selected',false);
			$('#ctl00_ContentBody_Bookmark_ddBookmarkList > option:contains('+ vBmLName_val+ ')').attr('selected',true);
			var Bookmark_Text = "Freischaltung: "+UrlParm('PDATE')+" um "+UrlParm('PTIME');
			$('#ctl00_ContentBody_Bookmark_tbComments').val(Bookmark_Text);
			$('#ctl00_ContentBody_Bookmark_btnSubmit').trigger('click');
	}
}

// Schleife für die Übersicht der Bookmarklisten. Diese Seite wird aufgerufen um die GUID der ausgewählen Liste zu finden
if (UrlParm('mod')&&UrlParm('PDATE')&&UrlParm('PGCCODE')&&!(UrlParm('SBM'))) {
	
	// Bookmark-Liste mit entsprechendem Namen suchen und Link bzw guid ermitteln
	var vBmLName_val = GM_getValue('Timepublisher_BmLName_' + SignedInAs, 'Timepublish');
	
	$('.Table > tbody:nth-child(2) > tr').each(function( index ) {
		if ($(this).find('td:nth-child(3)').find('a:nth-child(1)').html() == vBmLName_val) {
		GuidLink = $(this).find('td:nth-child(3)').find('a:nth-child(1)').attr('href');
		};
	});	
	// Aufruf der Bookmarkliste http://www.geocaching.com/bookmarks/view.aspx?guid=....
	var WeiterleitungsLink  = GuidLink;
		WeiterleitungsLink += "&PTIME="+UrlParm('PTIME')+"&PDATE="+UrlParm('PDATE');
		WeiterleitungsLink += "&TPTyp="+UrlParm('TPTyp')+"&COName="+UrlParm('COName');
		WeiterleitungsLink += "&PGCCODE="+UrlParm('PGCCODE')+"&SBM=START";
	window.location.href= WeiterleitungsLink;
}

// Schleife wenn die Bookmark-BESTÄTIGUNG aufgerufen wird
if (UrlParm('PTIME')&&UrlParm('PDATE')&&UrlParm('PGCCODE')&&UrlParm('SBM')) {
	
	// Lokal den aktuellen Cache zwischenspeichern
	localStorage.BookmarkAutoGCCode=UrlParm('PGCCODE');
	
	//CO Name aus URL auslesen
	//var COName = decodeURIComponent(UrlParm('COName'));
	//var COName = UrlParm('COName').decode;
	var NameOfParam = "Timepublisher_BmLName_COName";
	var COName = GM_getValue(NameOfParam, '');
	
	// Suche in Bookmarklisten-Tabelle nach GC-Code
	$('tr[id^="ctl00_ContentBody_ListInfo_BookmarkWpts"][id$="dataRow"] :nth-child(4)').each(function( index ) {
		if ($(this).text() == UrlParm('PGCCODE')) {
			$(this).closest('[id$="dataRow"]').find("td:nth-child(1) :input").attr('checked','checked');
			$('#ctl00_ContentBody_ListInfo_MassPublish').trigger('click');
			};
	});
	var PDATEstr = UrlParm('PDATE');
	var PDATEres = PDATEstr.split("."); 
	switch (PDATEres[1]) {
		case "01": var PDATEres2="January";break;
		case "1": var PDATEres2="January";break;
		case "02": var PDATEres2="February";break;
		case "2": var PDATEres2="February";break;
		case "03": var PDATEres2="March";break;
		case "3": var PDATEres2="March";break;
		case "04": var PDATEres2="April";break;
		case "4": var PDATEres2="April";break;
		case "05": var PDATEres2="May";break;
		case "5": var PDATEres2="May";break;
		case "06": var PDATEres2="June";break;
		case "6": var PDATEres2="June";break;
		case "07": var PDATEres2="July";break;
		case "7": var PDATEres2="July";break;
		case "08": var PDATEres2="August";break;
		case "8": var PDATEres2="August";break;
		case "09": var PDATEres2="September";break;
		case "9": var PDATEres2="September";break;
		case "10": var PDATEres2="October";break;
		case "11": var PDATEres2="November";break;
		case "12": var PDATEres2="December";break;
	}
		
	$('#ctl00_ContentBody_MassCachePublish_DateTimePublished').val(PDATEres[0]+" "+PDATEres2+" "+PDATEres[2]);
	$("#ctl00_ContentBody_MassCachePublish_HourToPublish option[value='"+UrlParm('PTIME')+"']").attr('selected', 'selected');
	
	var TPTyp = UrlParm('TPTyp');
	
	switch (TPTyp) {
	case "morgen":		var	LOGTEXT	= GM_getValue('Timepublisher_BmLTemplate_Morgen_'    + SignedInAs, GetDefaultTemplateText_morgen());
						break;
	case "wunsch":		var LOGTEXT	= GM_getValue('Timepublisher_BmLTemplate_Wunsch_'    + SignedInAs, GetDefaultTemplateText_wunsch());
						break;
	case "sonstiges":	var	LOGTEXT = GM_getValue('Timepublisher_BmLTemplate_Sonstiges_' + SignedInAs, GetDefaultTemplateText_sonstiges());
						break;
	}		


	LOGTEXT = LOGTEXT.replaceAll("%SignedInAs%",SignedInAs); 
	LOGTEXT = LOGTEXT.replaceAll("%CO%",COName); 
	
	$('#ctl00_ContentBody_MassCachePublish_tbLogInfo').text(LOGTEXT);
	if(TPTyp!="sonstiges") {$('#ctl00_ContentBody_MassCachePublish_LogButton').trigger('click');}
}

if (window.location.pathname=="/admin/CachePublish.aspx" && localStorage.BookmarkAutoGCCode.length != 0) {
	GCCode=localStorage.BookmarkAutoGCCode;
	localStorage.BookmarkAutoGCCode="";
	window.location.href	= "http://www.geocaching.com/admin/review.aspx?wp="+GCCode;
};


// FUNKTIONEN ***************************************************************



function UrlParm(ParmName, IgnoreCase, UrlString) {
	var RegRslt, sc = '', RtnVal = '';
	if (IgnoreCase) {sc = 'i'}
	if(UrlString) {
		var PageUrl = UrlString;
	} else {
		PageUrl = document.location + '';
	}
	var ParmString = PageUrl.substring(PageUrl.indexOf('?') + 1);
	var RegEx1 = new RegExp('(^|&)' + ParmName + '=(.*?)(&|#|$)', sc);
	RegRslt = RegEx1.exec(ParmString);
	if (RegRslt) {RtnVal = RegRslt[2]}
	return RtnVal;
}



/*--- Clean up ultra-crappy event handling ('til dev team eventually fixes).
    This must be done to allow the picker to work in a sandboxed environment.
    Alternately, you can modify the jQuery-UI source ala http://stackoverflow.com/q/2855403
*/
function cleanUpCrappyEventHandling () {
    var nodesWithBadEvents  = $(
        "div.ui-datepicker td[onclick^='DP'], div.ui-datepicker a[onclick^='DP']"
    );
    nodesWithBadEvents.each ( function () {
        var jThis       = $(this);
        var fubarFunc   = jThis.attr ("onclick");

        /*--- fubarFunc will typically be like:
            DP_jQuery_1325718069430.datepicker._selectDay('#pickMe',0,2012, this);return false;
        */
        fubarFunc       = fubarFunc.replace (/return\s+\w+;/i, "");

        jThis.removeAttr ("onclick");
        jThis.click ( function () {
            eval (fubarFunc);
            cleanUpCrappyEventHandling ();
        } );
    } );
}

function AufrufFreischalteLink(Bookmark_Link,Wunschzeit,WunschDatum,TPTyp,WunschGCCode,COName) {
	
	var WZeitH = (Wunschzeit/100).toFixed(0);
	var WZeitM = (((Wunschzeit/100)-((Wunschzeit/100).toFixed(0)))*100).toFixed(0);
	var Segment = WunschDatum.split(".");
	var WDatum = new Date(Segment[2],Segment[1]-1,Segment[0],WZeitH,WZeitM);
	//if (WZeitH<=0){var Taguebertrag=true; } else {var Taguebertrag=false;}
	
	var Sommerzeit = ((WDatum.DST())?"true":"false");
	if (Sommerzeit == "true") {
		// Wunschzeit - eine Stunde
		var ms = WDatum.getTime();
		ms = ms - (60*60*1000);
		WDatum.setTime(ms);
		var WunschzeitText = WDatum.getHours();
		WunschzeitText=addLeadingZeros(WunschzeitText, 2);
		var Minuten=WDatum.getMinutes();
		Minuten=addLeadingZeros(Minuten,2);
		WunschzeitText = WunschzeitText + Minuten; 
		WunschDatum = WDatum.getDate() + "." + addLeadingZeros((WDatum.getMonth()+1),2) + "." +	(WDatum.getYear()+1900);
	}
	else {
		WunschzeitText = Wunschzeit;
	}
	AufrufLink	= Bookmark_Link+'&PTIME='+WunschzeitText+"&PDATE="+WunschDatum+"&TPTyp="+TPTyp+"&PGCCODE="+WunschGCCode+"&COName="+COName;
	window.location.href	= AufrufLink;	
}

function addLeadingZeros(number, length) {
    var num = '' + number;
    while (num.length < length) num = '0' + num;
    return num;
}

	//********************************************************************************//
	//                                                                                //
	//                               Settings Functions                               //
	//                                                                                //
	//********************************************************************************//



	function fSetOptions() {
		if (!fCreateSettingsDiv('Timepublisher Options')) { return; };
		
		//  Get currently signed-on geocaching.com profile.
		var SignedInLink = document.evaluate(
				"//a[contains(@class, 'SignedInProfileLink')]",
				document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
				).singleNodeValue;
		if (SignedInLink) {
			var SignedInAs = SignedInLink.firstChild.data;
			SignedInAs = SignedInAs.replace(/<\&amp;>/g, '&');
		} else {
			var e_LogIn = document.getElementById("ctl00_LoginUrl");
			if (!e_LogIn) {
				var e_LogIn = document.getElementById("Header1_urlLogin");
			}
			if (e_LogIn.firstChild.data != 'Log out') { return; }
			SignedInAs = e_LogIn.parentNode.childNodes[1].firstChild.data;
			SignedInAs = SignedInAs.replace(/<\&amp;>/g, '&');
		}
	
		var divSet = document.getElementById('gm_divSet');

		var vBmLName_val 				= GM_getValue('Timepublisher_BmLName_'               + SignedInAs, 'Timepublish');
		var vBmLStop_val 		  		= GM_getValue('Timepublisher_BmLStop_'               + SignedInAs, 'stop');
		var vBmLTemplate_Morgen_val    	= GM_getValue('Timepublisher_BmLTemplate_Morgen_'    + SignedInAs, GetDefaultTemplateText_morgen());
		var vBmLTemplate_Wunsch_val    	= GM_getValue('Timepublisher_BmLTemplate_Wunsch_'    + SignedInAs, GetDefaultTemplateText_wunsch());
		var vBmLTemplate_Sonstiges_val 	= GM_getValue('Timepublisher_BmLTemplate_Sonstiges_' + SignedInAs, GetDefaultTemplateText_sonstiges());
		
		// Interface controls
		var Opt1 = document.createElement('span');
		Opt1.innerHTML = 'Name der Bookmark-Liste: ';
		var txtBmLList = fCreateSetting('BmLName', 'text', '', 'Name der Bookmark-Liste, die für die Timepublish-Funktion verwendet werden soll.', vBmLName_val, '215px');
		txtBmLList.parentNode.insertBefore(Opt1, txtBmLList);
		
		var Opt2 = document.createElement('span');
		var vSelVal = ["stop","cont","aktu","fragen"];
		var vSelTxt = ["Skript stoppen","Skript mit bestehendem Eintrag fortsetzen","Bookmark Eintrag aktualisieren","Nachfragen"];
		Opt2.innerHTML = '<br>Vorgehensweise wenn der Cache schon auf der ausgeählten Bookmarkliste steht: <br>';
		var txtBmLListStop = fCreateSetting('optBmEExistsStop', 'select', '', '', vBmLStop_val, '215px',vSelVal, vSelTxt);
		txtBmLListStop.parentNode.insertBefore(Opt2, txtBmLListStop);
		
		var Opt3 = document.createElement('span');
		Opt3.innerHTML = '<br>Template für einen Publish am morgigen Tag: <br>';
		var txtBmLTemplate_Morgen = fCreateSetting('optBmLTemplate_Morgen', 'textarea', '', '', vBmLTemplate_Morgen_val, '215px');
		txtBmLTemplate_Morgen.parentNode.insertBefore(Opt3, txtBmLTemplate_Morgen);
		
		var Opt4 = document.createElement('span');
		Opt4.innerHTML = '<br>Template für einen Publish am Wunschtag: <br>';
		var txtBmLTemplate_Wunsch = fCreateSetting('optBmLTemplate_Wunsch', 'textarea', '', '', vBmLTemplate_Wunsch_val, '215px');
		txtBmLTemplate_Wunsch.parentNode.insertBefore(Opt4, txtBmLTemplate_Wunsch);
		
		var Opt5 = document.createElement('span');
		Opt5.innerHTML = '<br>Template für sonstigen Timepublish: <br>';
		var txtBmLTemplate_Sonstiges = fCreateSetting('optBmLTemplate_Sonstiges', 'textarea', '', '', vBmLTemplate_Sonstiges_val, '115px');
		txtBmLTemplate_Sonstiges.parentNode.insertBefore(Opt5, txtBmLTemplate_Sonstiges);

		//  Create Save/Cancel Buttons.
		var ds_ButtonsP = document.createElement('div');
		ds_ButtonsP.setAttribute('class', 'SettingButtons');
		var ds_SaveButton = document.createElement('button');
		ds_SaveButton = document.createElement('button');
		ds_SaveButton.appendChild(document.createTextNode("Save"));
		ds_SaveButton.addEventListener("click", fSaveButtonClicked, true);
		var ds_CancelButton = document.createElement('button');
		ds_CancelButton.style.marginLeft = '6px';
		ds_CancelButton.addEventListener("click", fCancelButtonClicked, true);
		ds_CancelButton.appendChild(document.createTextNode("Cancel"));
		ds_ButtonsP.appendChild(ds_SaveButton);
		ds_ButtonsP.appendChild(ds_CancelButton);
		divSet.appendChild(ds_ButtonsP);

		fOpenSettingsDiv();
	}



	function fSaveButtonClicked() {
		//  Code to save settings
		
		//  Get currently signed-on geocaching.com profile.
		var SignedInLink = document.evaluate(
				"//a[contains(@class, 'SignedInProfileLink')]",
				document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
				).singleNodeValue;
		if (SignedInLink) {
			var SignedInAs = SignedInLink.firstChild.data;
			SignedInAs = SignedInAs.replace(/<\&amp;>/g, '&');
		} else {
			var e_LogIn = document.getElementById("ctl00_LoginUrl");
			if (!e_LogIn) {
				var e_LogIn = document.getElementById("Header1_urlLogin");
			}
			if (e_LogIn.firstChild.data != 'Log out') { return; }
			SignedInAs = e_LogIn.parentNode.childNodes[1].firstChild.data;
			SignedInAs = SignedInAs.replace(/<\&amp;>/g, '&');
		}
		
		var vBmLName_val = document.getElementById('txtBmLName');
		var vBmLStop_val = document.getElementById('seloptBmEExistsStop');

		var vBmLTemplate_Morgen_val = document.getElementById('txtaraoptBmLTemplate_Morgen');
		var vBmLTemplate_Wunsch_val = document.getElementById('txtaraoptBmLTemplate_Wunsch');
		var vBmLTemplate_Sonstiges_val = document.getElementById('txtaraoptBmLTemplate_Sonstiges');

		GM_setValue('Timepublisher_BmLName_' + SignedInAs, vBmLName_val.value.trim());
		GM_setValue('Timepublisher_BmLStop_' + SignedInAs, vBmLStop_val.options[vBmLStop_val.selectedIndex].value);
		GM_setValue('Timepublisher_BmLTemplate_Morgen_' + SignedInAs, vBmLTemplate_Morgen_val.value.trim());
		GM_setValue('Timepublisher_BmLTemplate_Wunsch_' + SignedInAs, vBmLTemplate_Wunsch_val.value.trim());
		GM_setValue('Timepublisher_BmLTemplate_Sonstiges_' + SignedInAs, vBmLTemplate_Sonstiges_val.value);

		fCloseSettingsDiv();
	}



	function fCancelButtonClicked() {
		var resp = confirm('Any changes will be lost. Close Settings?');
		if (resp) {
			fCloseSettingsDiv();
		}
	}



	//********************************************************************************//
	//                                                                                //
	//                          Settings Interface Functions                          //
	//                                                                                //
	//********************************************************************************//

	function fCreateSettingsDiv(sTitle) {

		//  If div already exists, reposition browser, and show alert.
		var divSet = document.getElementById("gm_divSet");
		if (divSet) {
			var YOffsetVal = parseInt(divSet.getAttribute('YOffsetVal', '0'));
			window.scrollTo(window.pageXOffset, YOffsetVal);
			alert('Edit Setting interface already on screen.');
			return false;
		}

		//  Set styles for titles and elements.
		GM_addStyle('.SettingTitle {font-size: medium; font-style: italic; font-weight: bold; ' +
				'text-align: center; margin-bottom: 12px; !important; } ' );
		GM_addStyle('.SettingElement {text-align: left; margin-left: 6px; ' +
				'margin-right: 6px; margin-bottom: 12px; !important; } ' );
		GM_addStyle('.SettingButtons {text-align: right; margin-left: 6px; ' +
				'margin-right: 6px; margin-bottom: 6px; !important; } ' );
		GM_addStyle('.SettingLabel {font-weight: bold; margin-left: 6px !important;} ' ); +

		//  Create blackout div.
		document.body.setAttribute('style', 'height:100%;');
		var divBlackout = document.createElement('div');
		divBlackout.id = 'divBlackout';
		divBlackout.setAttribute('style', 'z-index: 900; background-color: rgb(0, 0, 0); ' +
				'visibility: hidden; opacity: 0; position: fixed; left: 0px; top: 0px; '+
				'height: 100%; width: 100%; display: block;');

		//  Create div.
		divSet = document.createElement('div');
		divSet.id = 'gm_divSet';
		divSet.setAttribute('style', 'position: absolute; z-index: 1000; visibility: hidden; ' +
				'padding: 5px; outline: 6px ridge blue; background: #FFFFCC;');
		popwidth = parseInt(window.innerWidth * .5);
		divSet.style.width = popwidth + 'px';

		//  Create heading.
		var ds_Heading = document.createElement('div');
		ds_Heading.setAttribute('class', 'SettingTitle');
		ds_Heading.appendChild(document.createTextNode(sTitle));
		divSet.appendChild(ds_Heading);

		//  Add div to page.
		var toppos =  parseInt(window.pageYOffset +  60);
		var leftpos = parseInt((window.innerWidth / 2) - (popwidth / 2));
		divSet.style.top = toppos + 'px';
		divSet.style.left = leftpos + 'px';
		divSet.setAttribute('YOffsetVal', window.pageYOffset);

		//  Add blackout and setting divs.
		document.body.appendChild(divBlackout);
		document.body.appendChild(divSet);
		window.addEventListener('resize', fSetLeftPos, true);

		return true;
	}




	/*
	vID = GetSetting ID, and type + vID is control ID.
	vType = checkbox (input + type.checkbox), text (input), textarea, select
	vLabel = Text for control label.
	vTitle = Title text for input control and label, or vLabel if not specified.
	vDftVal = May be text, true/false, or matches a vSelVal array element.
	vSize = Length of input (text) box, or height of textarea, in pixels.
	vSelVal = Array of select option values.
	vSelTxt = Array of select option text.
	*/

 	function fCreateSetting(vID, vType, vLabel, vTitle, vDftVal, vSize, vSelVal, vSelTxt) {
		var divSet = document.getElementById('gm_divSet');
		var kParagraph = document.createElement('p');
		kParagraph.id = 'p' + vID;
		kParagraph.setAttribute('class', 'SettingElement');
		switch (vType) {
			case 'checkbox':
				var kElem = document.createElement('input');
				kElem.id = 'cb' + vID;
				kElem.type = 'checkbox';
				kElem. checked = vDftVal;
				break;
			case 'text':
				if (!vSize) { vSize = '150px'; }
				var kElem = document.createElement('input');
				kElem.id = 'txt' + vID;
				kElem.style.width = vSize;
				kElem.value = vDftVal;
				kElem.addEventListener('focus', fSelectAllText, true);
				break;
			 case 'textarea':
				if (!vSize) { vSize = '80px'; }
				var kElem = document.createElement('textarea');
				kElem.id = 'txtara' + vID;
				kElem.style.width = '100%';
				kElem.style.height = vSize;
				kElem.value = vDftVal;
				break;
			case 'select':
				var kElem = document.createElement('select');
				kElem.id = 'sel' + vID;
				if (vSelVal) {
					if (vSelVal.constructor == Array) {
						for (var i in vSelVal) {
							var kOption = document.createElement('option');
							kOption.value = vSelVal[i];
							kOption.selected = (vSelVal[i] == vDftVal);
							if ((vSelTxt.constructor == Array) && (vSelTxt.length >= i-1)) {
								var kTxtNode = vSelTxt[i];
							} else {
								var kTxtNode = vSelVal[i];
							}
							kOption.appendChild(document.createTextNode(kTxtNode));
							kElem.appendChild(kOption);
						}
					}
				}
				break;
		}

		var kLabel = document.createElement('label');
		kLabel.setAttribute('class', 'SettingLabel');
		kLabel.setAttribute('for', kElem.id);
		kLabel.appendChild(document.createTextNode(vLabel));
		if (!vTitle) { vTitle = vLabel; }
		kElem.title = vTitle;
		kLabel.title = kElem.title;

		if (vType == 'textarea') {
			kParagraph.appendChild(kLabel);
			kParagraph.appendChild(document.createElement('br'));
			kParagraph.appendChild(kElem);
		} else {
			kParagraph.appendChild(kElem);
			kParagraph.appendChild(kLabel);
		}
		divSet.appendChild(kParagraph);

		return kElem;
	}



	//  Resize/reposition on window resizing.
	function fSetLeftPos() {
		var divSet = document.getElementById('gm_divSet');
		if (divSet) {
			var popwidth = parseInt(window.innerWidth * .5);
			divSet.style.width = popwidth + 'px';
			var leftpos = parseInt((window.innerWidth / 2) - (popwidth / 2));
			divSet.style.left = leftpos + 'px';
		}
	}


	function fOpenSettingsDiv() {
		//  Add blackout and setting divs.
		var divBlackout = document.getElementById('divBlackout');
		var divSet = document.getElementById('gm_divSet');
		divSet.style.visibility = 'visible';
		divBlackout.style.visibility = 'visible';
		var op = 0;
		var si = window.setInterval(fShowBlackout, 40);
		//  Function to fade-in blackout div.
		function fShowBlackout() {
			op = op + .05;
			divBlackout.style.opacity = op;
			if (op >= .75) {
				window.clearInterval(si);
			}
		}
	}


	function fCloseSettingsDiv() {
		var divBlackout = document.getElementById('divBlackout');
		var divSet = document.getElementById('gm_divSet');
		divSet.parentNode.removeChild(divSet);
		divBlackout.parentNode.removeChild(divBlackout);
		window.removeEventListener('resize', fSetLeftPos, true);
	}



	function fCancelButtonClicked() {
		var resp = confirm('Any changes will be lost. Close Settings?');
		if (resp) {
			fCloseSettingsDiv();
		}
	}

	function fSelectAllText() {
		this.select();
	}
	
		//********************************************************************************//
		//                                                                                //
		//                             Default Template Text                              //
		//                                                                                //
		//********************************************************************************//
		
	function GetDefaultTemplateText_morgen() {
		var	LOGTEXT_S  = "Hallo %CO%\n";
			LOGTEXT_M  = "Deinen Cache habe ich soeben geprüft und er ist zum Publish bereit.\n\n";
			LOGTEXT_M += "Um die Natur zu schonen und einen \"Run\" auf den Cache zu vermeiden ";
			LOGTEXT_M += "werde ich ihn morgen früh veröffentlichen. ";
			LOGTEXT_M += "Bis dahin wird Deine Listingseite für alle Änderungen gesperrt.\n\n";
			LOGTEXT_M += "Falls es unbedingt notwendig sein sollte nochmals Änderungen vorzunehmen, ";
			LOGTEXT_M += "informiere mich bitte rechtzeitig per Mail.\n\n";
			LOGTEXT_M += "Beste Grüße\n%SignedInAs%\nOfficial Geocaching.com Volunteer Reviewer";
		return LOGTEXT_M;
	}
	
	function GetDefaultTemplateText_wunsch() {
		var LOGTEXT_S  = "Hallo %CO%\n";
			LOGTEXT_W  = "Deinen Cache habe ich soeben geprüft und er ist zum Publish bereit.\n\n";
			LOGTEXT_W += "Ich werde versuchen Deinen Wunsch zu erfüllen und den Cache am ";
			LOGTEXT_W += "gewünschten Tag freizuschalten. ";
			LOGTEXT_W += "Allerdings kann ich nicht garantieren, dass dies zum ";
			LOGTEXT_W += "exakten Wunschtermin klappt. Auch ich bin nicht 24 Stunden am Tag online. ";
			LOGTEXT_W += "Bis dahin wird Deine Listingseite für alle Änderungen gesperrt.\n\n";
			LOGTEXT_W += "Falls es unbedingt notwendig sein sollte nochmals Änderungen vorzunehmen, ";
			LOGTEXT_W += "informiere mich bitte rechtzeitig per Mail.\n\n";
			LOGTEXT_W += "Beste Grüße\n%SignedInAs%\nOfficial Geocaching.com Volunteer Reviewer";
		return LOGTEXT_W;
	}
	
	function GetDefaultTemplateText_sonstiges() {
		var	LOGTEXT_S  = "Hallo %CO%\n";
			LOGTEXT_S  = "\n\n";
			LOGTEXT_S += "\n\n";
			LOGTEXT_S += "Beste Grüße\n%SignedInAs%\nOfficial Geocaching.com Volunteer Reviewer";
		return LOGTEXT_S;
	}