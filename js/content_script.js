
window.addEventListener('load', function() {
    let nmin = 0, 
        nsec = 0, 
        nhour = 0,
        isPaused = false,
        refreshIntervalId = "",
        dataChips = [],
        targetingChips = [],
        settings = !localStorage.settings ? 
        localStorage.setItem("settings", JSON.stringify({"dark_mode": false, "bls_mode": false, "change_position": false})) : 
        console.log('Settings set');
    // var refreshInterval = "";
    // Get BLS 1 Info Page needs edit select/dropdown
    let rejectReasonSelect = document.querySelector('#rejection_reason');
    // Add browser-default to needs edit select/dropdown
    rejectReasonSelect ? rejectReasonSelect.classList.add('browser-default') : console.log('reject select not found');

    // function checkSurveyType(){
        
    //     let url = document.URL,
    //         rejectTable = rejectReasonSelect.parentElement.parentElement.parentElement.parentElement.parentElement;
        
    //     if (url){
    //         rejectTable ? rejectTable.classList.add('reject-table') : console.log('reject table not found');
    //     } else {
    //         console.log('not bls1');
    //     }
    // }
    

    document.onkeydown = (e) => {
        if (e.altKey && e.keyCode == 192){
            
            e.preventDefault();
            document.querySelector('#trackerUL').classList.toggle("scale-in");
            document.querySelector('.fixed-action-btn').classList.toggle("active");
            // document.querySelector('#trackerUL').classList.toggle("scale-out");
            // document.querySelector('#trackerUL').click();
            console.log(e);
        } else if (e.altKey && e.which == 81) {
            e.preventDefault();
            toggleCards();
        } else if (e.altKey && e.which == 69){
            e.preventDefault();
            doNeedsInfo();
        } else if (e.altKey && e.which == 87){
            $('#modal1').modal('open');
            inputID.focus();
            navigator.clipboard.readText().then(text => {
                inputID.value = text;
                console.log(text);
            });
            // document.execCommand('Paste');
        }
    }


    let data={countrySelectOptions:[{name:"Afghanistan"},{name:"Ã…land Islands"},{name:"Albania"},{name:"Algeria"},{name:"American Samoa"},{name:"Andorra"},{name:"Angola"},{name:"Anguilla"},{name:"Antarctica"},{name:"Antigua and Barbuda"},{name:"Argentina"},{name:"Armenia"},{name:"Aruba"},{name:"Australia"},{name:"Austria"},{name:"Azerbaijan"},{name:"Bahamas"},{name:"Bahrain"},{name:"Bangladesh"},{name:"Barbados"},{name:"Belarus"},{name:"Belgium"},{name:"Belize"},{name:"Benin"},{name:"Bermuda"},{name:"Bhutan"},{name:"Bolivia"},{name:"Bosnia and Herzegovina"},{name:"Botswana"},{name:"Bouvet Island"},{name:"Brazil"},{name:"British Indian Ocean Territory"},{name:"Brunei Darussalam"},{name:"Bulgaria"},{name:"Burkina Faso"},{name:"Burundi"},{name:"Cambodia"},{name:"Cameroon"},{name:"Canada"},{name:"Cape Verde"},{name:"Cayman Islands"},{name:"Central African Republic"},{name:"Chad"},{name:"Chile"},{name:"China"},{name:"Christmas Island"},{name:"Cocos (Keeling) Islands"},{name:"Colombia"},{name:"Comoros"},{name:"Congo"},{name:"Congo"},{name:"The Democratic Republic of The Cook Islands"},{name:"Costa Rica"},{name:"Cote D'ivoire"},{name:"Croatia"},{name:"Cuba"},{name:"Cyprus"},{name:"Czech Republic"},{name:"Denmark"},{name:"Djibouti"},{name:"Dominica"},{name:"Dominican Republic"},{name:"Ecuador"},{name:"Egypt"},{name:"El Salvador"},{name:"Equatorial Guinea"},{name:"Eritrea"},{name:"Estonia"},{name:"Ethiopia"},{name:"Falkland Islands (Malvinas)"},{name:"Faroe Islands"},{name:"Fiji"},{name:"Finland"},{name:"France"},{name:"French Guiana"},{name:"French Polynesia"},{name:"French Southern Territories"},{name:"Gabon"},{name:"Gambia"},{name:"Georgia"},{name:"Germany"},{name:"Ghana"},{name:"Gibraltar"},{name:"Greece"},{name:"Greenland"},{name:"Grenada"},{name:"Guadeloupe"},{name:"Guam"},{name:"Guatemala"},{name:"Guernsey"},{name:"Guinea"},{name:"Guinea-bissau"},{name:"Guyana"},{name:"Haiti"},{name:"Heard Island and Mcdonald Islands"},{name:"Holy See (Vatican City State)"},{name:"Honduras"},{name:"Hong Kong"},{name:"Hungary"},{name:"Iceland"},{name:"India"},{name:"Indonesia"},{name:"Iran"},{name:"Iraq"},{name:"Ireland"},{name:"Isle of Man"},{name:"Israel"},{name:"Italy"},{name:"Jamaica"},{name:"Japan"},{name:"Jersey"},{name:"Jordan"},{name:"Kazakhstan"},{name:"Kenya"},{name:"Kiribati"},{name:"Korea"},{name:"Democratic People's Republic of Korea"},{name:"Republic of Kuwait"},{name:"Kyrgyzstan"},{name:"Lao People's Democratic Republic"},{name:"Latvia"},{name:"Lebanon"},{name:"Lesotho"},{name:"Liberia"},{name:"Libyan Arab Jamahiriya"},{name:"Liechtenstein"},{name:"Lithuania"},{name:"Luxembourg"},{name:"Macao"},{name:"Macedonia"},{name:"The Former Yugoslav Republic of Madagascar"},{name:"Malawi"},{name:"Malaysia"},{name:"Maldives"},{name:"Mali"},{name:"Malta"},{name:"Marshall Islands"},{name:"Martinique"},{name:"Mauritania"},{name:"Mauritius"},{name:"Mayotte"},{name:"Mexico"},{name:"Federated States of Micronesia"},{name:"Moldova"},{name:"Monaco"},{name:"Mongolia"},{name:"Montenegro"},{name:"Montserrat"},{name:"Morocco"},{name:"Mozambique"},{name:"Myanmar"},{name:"Namibia"},{name:"Nauru"},{name:"Nepal"},{name:"Netherlands"},{name:"Netherlands Antilles"},{name:"New Caledonia"},{name:"New Zealand"},{name:"Nicaragua"},{name:"Niger"},{name:"Nigeria"},{name:"Niue"},{name:"Norfolk Island"},{name:"Northern Mariana Islands"},{name:"Norway"},{name:"Oman"},{name:"Pakistan"},{name:"Palau"},{name:"Palestinian Territory Occupied"},{name:"Panama"},{name:"Papua New Guinea"},{name:"Paraguay"},{name:"Peru"},{name:"Philippines"},{name:"Pitcairn"},{name:"Poland"},{name:"Portugal"},{name:"Puerto Rico"},{name:"Qatar"},{name:"Reunion"},{name:"Romania"},{name:"Russian Federation"},{name:"Rwanda"},{name:"Saint Helena"},{name:"Saint Kitts and Nevis"},{name:"Saint Lucia"},{name:"Saint Pierre and Miquelon"},{name:"Saint Vincent and The Grenadines"},{name:"Samoa"},{name:"San Marino"},{name:"Sao Tome and Principe"},{name:"Saudi Arabia"},{name:"Senegal"},{name:"Serbia"},{name:"Seychelles"},{name:"Sierra Leone"},{name:"Singapore"},{name:"Slovakia"},{name:"Slovenia"},{name:"Solomon Islands"},{name:"Somalia"},{name:"South Africa"},{name:"South Georgia and The South Sandwich Islands"},{name:"Spain"},{name:"Sri Lanka"},{name:"Sudan"},{name:"Suriname"},{name:"Svalbard and Jan Mayen"},{name:"Swaziland"},{name:"Sweden"},{name:"Switzerland"},{name:"Syrian Arab Republic"},{name:"Taiwan"},{name:"China"},{name:"Tajikistan"},{name:"Tanzania"},{name:"Thailand"},{name:"Timor-leste"},{name:"Togo"},{name:"Tokelau"},{name:"Tonga"},{name:"Trinidad and Tobago"},{name:"Tunisia"},{name:"Turkey"},{name:"Turkmenistan"},{name:"Turks and Caicos Islands"},{name:"Tuvalu"},{name:"Uganda"},{name:"Ukraine"},{name:"United Arab Emirates"},{name:"United Kingdom"},{name:"United States"},{name:"United States Minor Outlying Islands"},{name:"Uruguay"},{name:"Uzbekistan"},{name:"Vanuatu"},{name:"Venezuela"},{name:"Viet Nam"},{name:"Virgin Islands British"},{name:"Virgin Islands U.S."},{name:"Wallis and Futuna"},{name:"Western Sahara"},{name:"Yemen"},{name:"Zambia"},{name:"Zimbabwe"}],languageSelectOptions:[{name:"Afrikaans (af)",langCode:"af"},{name:"Albanian (sq)",langCode:"sq"},{name:"Amharic (am)",langCode:"am"},{name:"Arabic (ar)",langCode:"ar"},{name:"Arabic (Egypt) (ar-EG)",langCode:"ar-EG"},{name:"Armenian (hy)",langCode:"hy"},{name:"Azerbaijani (az)",langCode:"az"},{name:"Basque (eu)",langCode:"eu"},{name:"Belarusian (be)",langCode:"be"},{name:"Bengali (bn)",langCode:"bn"},{name:"Bosnian (bs)",langCode:"bs"},{name:"Bulgarian (bg)",langCode:"bg"},{name:"Burmese (Myanmar) (my)",langCode:"my"},{name:"Catalan (ca)",langCode:"ca"},{name:"Chinese (Hong Kong) (zh-HK)",langCode:"zh-HK"},{name:"Chinese (Malay) (zh-MS)",langCode:"zh-MS"},{name:"Chinese (Simplified) (zh-Hans)",langCode:"zh-Hans"},{name:"Chinese (Singapore) (zh-SG)",langCode:"zh-SG"},{name:"Chinese (Traditional) (zh-Hant)",langCode:"zh-Hant"},{name:"Croatian (hr)",langCode:"hr"},{name:"Czech (cs)",langCode:"cs"},{name:"Danish (da)",langCode:"da"},{name:"Dutch (nl)",langCode:"nl"},{name:"Dutch (Belgium) (nl-BL)",langCode:"nl-BL"},{name:"English (en)",langCode:"en"},{name:"English (Australia) (en-AU)",langCode:"en-AU"},{name:"English (Belgium) (en-BL)",langCode:"en-BL"},{name:"English (Canada) (en-CA)",langCode:"en-CA"},{name:"English (Hong Kong) (en-HK)",langCode:"en-HK"},{name:"English (India) (en-IN)",langCode:"en-IN"},{name:"English (Ireland) (en-IE)",langCode:"en-IE"},{name:"English (Malaysia) (en-MY)",langCode:"en-MY"},{name:"English (New Zealand) (en-NZ)",langCode:"en-NZ"},{name:"English (Singapore) (en-SG)",langCode:"en-SG"},{name:"English (South Africa) (en-ZA)",langCode:"en-ZA"},{name:"English (Switzerland) (en-CH)",langCode:"en-CH"},{name:"English (UK) (en-GB)",langCode:"en-GB"},{name:"Estonian (et)",langCode:"et"},{name:"Farsi (fa)",langCode:"fa"},{name:"Filipino (fil)",langCode:"fil"},{name:"Finnish (fi)",langCode:"fi"},{name:"French (fr)",langCode:"fr"},{name:"French (Belgium) (fr-BL)",langCode:"fr-BL"},{name:"French (Canada) (fr-CA)",langCode:"fr-CA"},{name:"French (Luxembourg) (fr-LU)",langCode:"fr-LU"},{name:"French (Switzerland) (fr-CH)",langCode:"fr-CH"},{name:"Galician (gl)",langCode:"gl"},{name:"Georgian (ka)",langCode:"ka"},{name:"German (de)",langCode:"de"},{name:"German (Austria) (de-AT)",langCode:"de-AT"},{name:"German (Belgium) (de-BL)",langCode:"de-BL"},{name:"German (Luxembourg) (de-LU)",langCode:"de-LU"},{name:"German (Switzerland) (de-CH)",langCode:"de-CH"},{name:"Greek (el)",langCode:"el"},{name:"Gujarati (gu)",langCode:"gu"},{name:"Hebrew (iw)",langCode:"iw"},{name:"Hindi (hi)",langCode:"hi"},{name:"Hungarian (hu)",langCode:"hu"},{name:"Icelandic (is)",langCode:"is"},{name:"Indonesian (id)",langCode:"id"},{name:"Irish (ga)",langCode:"ga"},{name:"Italian (it)",langCode:"it"},{name:"Italian (Switzerland) (it-CH)",langCode:"it-CH"},{name:"Japanese (ja)",langCode:"ja"},{name:"Kannada (kn)",langCode:"kn"},{name:"Kazakh (kk)",langCode:"kk"},{name:"Khmer (km)",langCode:"km"},{name:"Kinyarwanda (rw)",langCode:"rw"},{name:"Korean (ko)",langCode:"ko"},{name:"Kyrgyz (ky)",langCode:"ky"},{name:"Lao (lo)",langCode:"lo"},{name:"Latin (la)",langCode:"la"},{name:"Latvian (lv)",langCode:"lv"},{name:"Lithuanian (lt)",langCode:"lt"},{name:"Luganda (lg)",langCode:"lg"},{name:"Macedonian (mk)",langCode:"mk"},{name:"Malagasy (mg)",langCode:"mg"},{name:"Malay (ms)",langCode:"ms"},{name:"Malayalam (ml)",langCode:"ml"},{name:"Maltese (mt)",langCode:"mt"},{name:"Marathi (mr)",langCode:"mr"},{name:"Mauritian Creole (crp)",langCode:"crp"},{name:"Mongolian (mn)",langCode:"mn"},{name:"Nepali (ne)",langCode:"ne"},{name:"Norwegian (no)",langCode:"no"},{name:"Norwegian (DO NOT USE) (nb)",langCode:"nb"},{name:"Norwegian (Nynorsk) (nn)",langCode:"nn"},{name:"Oriya (or)",langCode:"or"},{name:"Polish (pl)",langCode:"pl"},{name:"Portuguese (pt)",langCode:"pt"},{name:"Portuguese (Brazil) (pt-BR)",langCode:"pt-BR"},{name:"Punjabi (pa)",langCode:"pa"},{name:"Rhaeto-Romance (rm)",langCode:"rm"},{name:"Romanian (ro)",langCode:"ro"},{name:"Russian (ru)",langCode:"ru"},{name:"Russian (Azerbaijan) (ru-AZ)",langCode:"ru-AZ"},{name:"Russian (Belarus) (ru-BY)",langCode:"ru-BY"},{name:"Russian (Kazakhstan) (ru-KZ)",langCode:"ru-KZ"},{name:"Russian (Ukraine) (ru-UA)",langCode:"ru-UA"},{name:"Serbian (sr)",langCode:"sr"},{name:"Sinhala (si)",langCode:"si"},{name:"Slovak (sk)",langCode:"sk"},{name:"Slovenian (sl)",langCode:"sl"},{name:"Spanish (es)",langCode:"es"},{name:"Spanish (Latin America) (es-419)",langCode:"es-419"},{name:"Swahili (sw)",langCode:"sw"},{name:"Swedish (sv)",langCode:"sv"},{name:"Tamil (ta)",langCode:"ta"},{name:"Telugu (te)",langCode:"te"},{name:"Thai (th)",langCode:"th"},{name:"Turkish (tr)",langCode:"tr"},{name:"Ukrainian (uk)",langCode:"uk"},{name:"Urdu (ur)",langCode:"ur"},{name:"Uzbek (uz)",langCode:"uz"},{name:"Vietnamese (vi)",langCode:"vi"},{name:"Welsh (cy)",langCode:"cy"},{name:"Yiddish (yi)",langCode:"yi"},{name:"Yoruba (yo)",langCode:"yo"},{name:"Zulu (zu)",langCode:"zu"}],SRCategories:[{name:"Review-SurveyStarted"},{name:"Review-NeedsInfo"},{name:"Review-Consult"},{name:"Review-NonEN"},{name:"Review-Adult"},{name:"Review-Spelling"},{name:"Review-R&CGeneral"},{name:"Review-HealthMedical"},{name:"Review-ReviewedMoreThanOnce"},{name:"Review-CustomPreScreen"},{name:"Review-Disclaimer"},{name:"Review-IntRecurring"},{name:"Review-IntResponses"},{name:"Review-Language"},{name:"Review-Offensive"},{name:"Review-PII"},{name:"Review-Policypoll"},{name:"Review-Pushpollpromo"},{name:"Review-R&CCapitalization"},{name:"Review-R&CCharacterLimit"},{name:"Review-R&Cimage"},{name:"Review-R&CMachineTranslation"},{name:"Review-R&Cmultiquestion"},{name:"Review-R&CNOTA"},{name:"Review-R&Cpartialpin"},{name:"Review-R&Cpiping"},{name:"Review-R&CQuestionType"},{name:"Review-R&CRanges"},{name:"Review-R&Cvideo"},{name:"Review-Screenq"},{name:"Review-Sendemo"},{name:"Review-Sensubj"},{name:"Review-Targeting"},{name:"Review-RMK"},{name:"Review-STRRMK"},{name:"Review-STRZIP"},{name:"Review-ZIP"},{name:"Review-Surveys360"},{name:"360-Surveys360Reseller"},{name:"360-Surveys360"},{name:"Review-Enterprise-Invoice"},{name:"Review-Enterprise-SharedBalance"},{name:"Review-SexStarted"},{name:"Review-Financial"},{name:"Review-HealthStarted"},{name:"Review-PoliticalStarted"},{name:"Review-TechStarted"},{name:"Review-AlcoholStarted"},{name:"Review-GamblingStarted"},{name:"Review-TradeUnion"},{name:"Review-OtherForbidden"},{name:"TRN"},{name:"SurveyDeleted"},{name:"API-Hats"},{name:"API-Crust"},{name:"Support-RefundCoupon"},{name:"Review-Split"},{name:"Overpaid"}],supportCategories:[{name:"Support-NoActionNeeded"},{name:"Support-CreationWarm"},{name:"Support-RMK"},{name:"Support-STR"},{name:"Support-Zip"},{name:"Support-Account Creation"},{name:"Support-AddOwner"},{name:"Support-Adwords"},{name:"Support-BuyResponses"},{name:"Support-Creation"},{name:"Support-CustomSalesLeads"},{name:"Support-Contact"},{name:"Support-Flagged/Enterprise"},{name:"Support-Flagged/Internal"},{name:"Support-Flagged/Restarted"},{name:"Support-Flagged/Stopped"},{name:"Support-General"},{name:"Support-HighRisk"},{name:"Support-IncTest"},{name:"Support-IncToolBug"},{name:"Support-Methodology"},{name:"Support-NoQ"},{name:"Support-Pause/Stop"},{name:"Support-Payment/Billing"},{name:"Support-Policy"},{name:"Support-Pricing"},{name:"Support-ProductFeedback"},{name:"Support-RefundCoupon"},{name:"Support-Reporting/Analysis"},{name:"Support-Spam"},{name:"Support-Targeting"},{name:"Support-TrackingSubscriptions"},{name:"Support-UserFeedback(not GOR)"},{name:"Support-Websat"},{name:"Support-WhitelistSupport"},{name:"Support-Googler"},{name:"Support-Enterprise-Invoice"},{name:"Support-Enterprise-SharedBalance"},{name:"Support-RMK"},{name:"Support-STR"},{name:"Support-ZIP"},{name:"Support-Account Creation"},{name:"Support-AccountLinking"},{name:"Support-Surveys360Client"},{name:"Support-Flagged/Enterprise"},{name:"Support-CustomSalesLeads"},{name:"Support-NeedsInfo"},{name:"Support-Consult"},{name:"Support-OpinionRewards"},{name:"Support-Chat"},{name:"Support-360Reseller"},{name:"Support-360"},{name:"Support-NewCustomer"},{name:"Support-Deleted"},{name:"Support-Inbound"},{name:"Support-Followup"},{name:"Support-Feedback"},{name:"Support-SameIssue"},{name:"Support-Deleted"},{name:"Review-ReviewedMoreThanOnce"},{name:"Support-NonEn"},{name:"Support-NonGCS"},{name:"TRN"},{name:"Overpaid"},{name:"Routed from Other Product"}],pubCategories:[{name:"Pub-AddOwner"},{name:"Pub-AdvancedTab"},{name:"Pub-HouseSurveys"},{name:"Pub-Frequency/Metering"},{name:"Pub-RHS"},{name:"Pub-AnchoredPrompt"},{name:"Pub-Triggerprompt/Async"},{name:"Pub-Callback"},{name:"Pub-CountryFiltering"},{name:"Pub-DomainFilter/refer"},{name:"Pub-PromptTitle"},{name:"Pub-PublisherExtendedAccessPeriod"},{name:"Pub-aaumessage"},{name:"Pub-Staging"},{name:"Pub-MobilePromptMessage"},{name:"Pub-ZipcodeFilter"},{name:"Pub-Selfie"},{name:"Pub-Strategic"},{name:"Pub-Policy"},{name:"Pub-ReportingDashboard"},{name:"Pub-AdSense/Payment"},{name:"Pub-Troubleshoot/Investigate"},{name:"Pub-Troubleshoot/InvestigateTriggerAsync"},{name:"Pub-Troubleshoot/InvestigateAnchored"},{name:"Pub-Troubleshoot/InvestigateCallback"},{name:"Pub-Troubleshoot/InvestigateCan'tSignUp"},{name:"Pub-Troubleshoot/InvestigateInventory"},{name:"Pub-AdvancedOthers"},{name:"Pub-FrequencyMeteringOthers"},{name:"Pub-TriggerPromptOthers"},{name:"Pub-CallbackOthers"},{name:"Pub-RHSOthers"},{name:"Pub-AnchoredPromptOthers"},{name:"Pub-dev"},{name:"Pub-dev>whitelist"},{name:"Pub-dev>approve"},{name:"Pub-SameIssue"},{name:"Pub-NeedsInfo"},{name:"Pub-Consult"},{name:"Pub-CallRequest"},{name:"Pub-CallDone"},{name:"Pub-Reach out"},{name:"Pub-Disabled"},{name:"Pub-SelfDisable"},{name:"Pub-General"},{name:"Pub-NewSelfie"},{name:"Pub-NewStrategic"},{name:"Pub-Feedback"},{name:"Pub-ProductFeedback"},{name:"Pub-UserFeedback"},{name:"TRN"},{name:"Support-Websat"}],partnershipCategories:[{name:"Partnership > DCLK - DBM > Approved"},{name:"Partnership > DCLK - DBM > Rejected"},{name:"Partnership > DCLK - DBM - Auto Reject"},{name:"Partnership > DCLK - DCM > Approved"},{name:"Partnership > DCLK - DCM > Rejected"},{name:"Partnership > DCLK - DCM - Auto Reject"},{name:"Partnership > DCLK - DS > Approved"},{name:"Partnership > DCLK - DS > Rejected"},{name:"Partnership > DCLK - DS - Auto Reject"},{name:"Partnership > GA360 - DS > Approved"},{name:"Partnership > GA360 - DS > Rejected"},{name:"Partnership > GA360 - GTM > Approved"},{name:"Partnership > GA360 - GTM > Rejected"},{name:"Partnership > GA360 - Optimize > Approved"},{name:"Partnership > GA360 - Optimize > Rejected"},{name:"Partnership > Forum Access Request > Approved"},{name:"Partnership > Forum Access Request > Rejected"},{name:"Partnership > GACP - Support"},{name:"Partnership > GACP - Escalate"},{name:"Partnership > DCLCK - Creative > Approved"},{name:"Partnership > DCLCK - Creative > Rejected"},{name:"Partnership > DCLCK - Creative - Auto Reject"},{name:"Partnership > DCLCK - Surveys > Approved"},{name:"Partnership > DCLCK - Surveys > Rejected"},{name:"Partnership-Consult"},{name:"TRN"}],studyChecker:{GTGLabel:[{label:"Refers to Sex",cr:"Your survey includes content with reference to sex."},{label:"Weight Loss Programs",cr:"Your survey includes content about weight loss programs."},{label:"Allowed Birth Control",cr:"Your survey includes content about allowed birth control."},{label:"Political Issues",cr:"Your survey includes content about political issues."},{label:"Political Candidates",cr:"Your survey includes content about political candidates."},{label:"Video Games",cr:"Your survey includes content about video games."},{label:"Alcohol",cr:"Your survey includes content about alcohol."},{label:"Gambling",cr:"Your survey includes content about gambling."}],NGTGLabel:[{label:"Adult Activities",cr:"Your survey includes content about adult activities."},{label:"Sexual Behavior",cr:"Your survey includes content about sexual behavior."},{label:"Drugs",cr:"Your survey includes content about drugs."},{cr:"Your survey includes content about guns.",label:"Guns"},{cr:'Your survey contains a spelling or grammatical error. Please correct it by editing the answer option "" into "".',label:"Spelling and Grammar"},{cr:"Your survey has answer options in a different language than the question.",label:"Wrong Language"},{cr:'Questions and answers should be grammatically clear, contextually relevant and directly associate with your survey content. Please edit the answer option "" to make it compliant.',label:"Garbage Text"},{cr:'The question doesn\'t seem to match with the answer options. Please edit or change the answer option/s "".',label:"Irrelevant"},{cr:'Your survey already includes a "None of the Above" option by default.',label:"None of the Above Answer"},{cr:"Your survey includes content about financial status.",label:"Financial Status"},{cr:"Your survey includes content about getting rich.",label:"Get Rich"},{cr:"Your survey includes content about loans or lending services.",label:"Loans"},{cr:"Your survey includes content about hospitals or health care facilities.",label:"Hospitals"},{cr:"Your survey includes content about weight loss pills.",label:"Weight Loss Pills"},{cr:"Your survey includes content about OTC drugs",label:"OTC Drugs"},{cr:"Your survey includes content about non-OTC drugs.",label:"Non-OTC Drugs"},{cr:"Your survey includes content about health conditions.",label:"Health Conditions"},{cr:"Your survey includes content about cosmetic procedures.",label:"Cosmetic Procedures"},{cr:"Your survey includes content about sexual health.",label:"Sexual Health"},{cr:"Your survey includes content about birth control products or methods.",label:"Disallowed Birth Control"},{cr:"Your survey includes content about medical treatments.",label:"Medical Treatments"},{cr:"Your survey contains inappropriate language.",label:"Inappropriate Language"},{cr:"Your survey includes content about harassment.",label:"Harassment"},{cr:"Your survey includes content about political issues.",label:"Political Issues"},{cr:"Your survey includes content about political candidates.",label:"Political Candidates"},{cr:"Your survey includes content about political affiliation.",label:"Political Affiliation"},{cr:"Your survey includes content about age.",label:"Age"},{cr:"Your survey includes content about gender",label:"Gender"},{cr:"Your survey includes content about sexual orientation.",label:"Sexual Orientation"},{cr:"Your survey includes content about race or ethnicity.",label:"Race Ethnicity"},{cr:"Your survey includes content about religion.",label:"Religion"},{cr:"Your survey includes content about immigration or immigrants.",label:"Immigration"},{cr:"Your survey includes content about death.",label:"Death"},{cr:"Your survey includes content about criminal record.",label:"Past Criminal Record"},{cr:"Your survey includes content about personally identifiable information.",label:"PII"},{cr:"Your survey includes content about alcohol.",label:"Alcohol"},{cr:"Your survey includes content about gambling.",label:"Gambling"},{cr:"Your survey includes content about push polling or promotion.",label:"Push Polling"},{cr:"Your survey includes content about trade union.",label:"Trade Union"},{cr:"Your survey includes content about _____.",label:"Other Forbidden (any other reason that is not captured by other policies)"}]}};
    
    checkValidURL(); 

    function init(){
        showFAB();
    
        const assignSurvey = document.querySelector('#assignSurvey'),
            unassignSurvey = document.querySelector('#unassignSurvey'),
            needsInfoBtn = document.querySelector('#needsInfoBtn'),
            consultBtn = document.querySelector('#consultBtn'),
            trackBtn = document.querySelector('#trackBtn'),
            caseID = document.querySelector('#caseID'),
            card1 = document.querySelector('#card-1'),
            card2 = document.querySelector('#card-2'),
            queueSelect = document.querySelector('#queue-select'),
            compliantBtn = document.querySelector('#compliant-btn'),
            noncompliantBtn =  document.querySelector('#noncompliant-btn'),
            closeBtn = document.querySelector('#close-btn'),
            enableActions = document.querySelector('#enable_actions'),
            closeCase = document.querySelector('#closeCase'),
            countryInput = document.querySelector('#countryInput'),
            // langSelect = document.querySelector('#lang-select'),
            languageInput = document.querySelector('#languageInput'),
            settingsDropdown = document.querySelector('#settings-dropdown'),
            blsModeSwitch = document.querySelector('#blsModeSwitch'),
            darkModeSwitch = document.querySelector('#darkModeSwitch'),
            cardNav = document.querySelector('#card-nav'),
            targetingCategories = document.querySelector('#targeting-categories'),
            rmto = document.querySelector('#rmto'),
            blsChecker = document.querySelector('#blsChecker'),
            consultTable = document.querySelector('#consultTable'),
            selectSurveyDecision = document.querySelector("#selectSurveyDecision"),
            refreshInterval = '',
            searchData = [],
            searchInput= document.querySelector("#searchInput"),
            searchWrapper= document.querySelector("#searchWrapper"),
            searchResultsList= document.querySelector("#searchResultsList"),
            changePosition = document.querySelector("#changePosition"),
            tableTitle = document.querySelector("#tableTitle"),
            btnTableConsult = document.querySelector("#btnTableConsult"),
            btnTableSubmitted = document.querySelector("#btnTableSubmitted");

            
    
        // Intialize Materialize Elements
        $('.collapsible').collapsible();
        $('ul.tabs').tabs();   
        $('.tooltipped').tooltip({delay: 50});
        $('.chips').material_chip();

        $('#settings-btn').dropdown({
            inDuration: 100,
            outDuration: 75,
            constrainWidth: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 5, // Spacing from edge
            belowOrigin: true, // Displays dropdown below the button
            alignment: 'bottom', // Displays dropdown with edge aligned to the left of button
            stopPropagation: true // Stops event propagation
          }
        );
        
        
        caseID.focus();

        // Initialize browser-default element

        // Default selected queue
        surveyReviewQueue();

        // Dark Mode
        checkDarkMode();

        // BLS Mode
        checkBLSMode();

        // Change position
        checkPosition();

        // 
        // Table View
        // 
        // 12345
        btnTableConsult.addEventListener('click', () => {
            tableTitle.textContent = 'Consulted Cases';
            tableTitle.setAttribute("data-id", "consulted");
            btnTableSubmitted.classList.toggle('darken-4');
            btnTableConsult.classList.toggle('darken-4');

            let tableSelected = tableTitle.dataset.id;
            document.querySelector('#ni-table-loader').classList.toggle('hide');
            getNIBucket("consulted");
        });

        btnTableSubmitted.addEventListener('click', () => {
            tableTitle.textContent = 'Submitted Cases';
            tableTitle.setAttribute("data-id", "submitted");
            btnTableSubmitted.classList.toggle('darken-4');
            btnTableConsult.classList.toggle('darken-4');

            let tableSelected = tableTitle.dataset.id;
            document.querySelector('#ni-table-loader').classList.toggle('hide');
            getNIBucket("submitted");
        });
        
        consultTable.addEventListener('click', () => {
            let tableSelected = tableTitle.dataset.id;

            $('#nimodal').modal('open');
            document.querySelector('#ni-table-loader').classList.toggle('hide');
            loadNITable();
            
            getNIBucket(tableSelected);
        });

        searchInput.addEventListener("input", getResults);
        
        // Case ID auto-populate
        caseID.addEventListener('click', (e) => {
            let openedCaseID = localStorage.all_open_cases || "";
            e.target.value = openedCaseID;
            console.log(e.target);
        });

        $('#violations-chip').on('chip.delete', function(e, chip){
            dataChips.splice(dataChips.indexOf(chip.tag), 1);
            console.log(chip.tag);
        });

        // Targeting Categories
        targetingCategories.addEventListener('change', () => {
            let categorySelected = targetingCategories.options[targetingCategories.selectedIndex].value;
                
            console.log(categorySelected + targetingChips);
            
            targetingChips.push({tag: categorySelected})
            $('#targeting-chips').material_chip({
                data: targetingChips
            });
        });

        $('#targeting-chips').on('chip.delete', function(e, chip){
            targetingChips.splice(targetingChips.indexOf(chip.tag), 1);
            console.log(chip.tag);
        });
    
        // Assign
        assignSurvey.addEventListener('click', () => {
            !caseID.value ? caseID.classList.toggle('invalid') : doAssign();
        });

        // countrySelect.addEventListener('change', () => {
        //     let countrySeleted = countrySelect.options[countrySelect.selectedIndex].value;

        //     countrySeleted == 'United States' ? langSelect.selectedIndex = 25 : console.log('other');
        //     console.log(langSelect.selectedIndex);
        // });
        
        

        trackBtn.addEventListener('click', (function(){                  
            console.log('f');
            document.querySelector('#trackerUL').classList.toggle("scale-in");
            // document.querySelector('#trackerUL').parentElement.classList.toggle("active");
            
            // document.querySelector('.fixed-action-btn').classList.toggle("active");
        }));
    
        // Unassign
        unassignSurvey.addEventListener('click', doUnassign);
    
        // Needs Info
        needsInfoBtn.addEventListener('click', doNeedsInfo);

        // Consult
        consultBtn.addEventListener('click', doConsult);
               
        // Decision Undo/Back
        enableActions.addEventListener('click', toggleDecisionBtn);

        // BLS Checker
        blsChecker.addEventListener('click', () => {
            $('#modal1').modal('open');
        });

        // inputID
        // resultBtn
        // manageResultBtn
        document.querySelector('#resultBtn').addEventListener('click', doCheckResult);
        document.querySelector('#manageResultBtn').addEventListener('click', doManageResult);

        selectSurveyDecision.addEventListener('change', toggleLabels);

        countryInput.addEventListener('input', countryListener);
        languageInput.addEventListener('input', languageListener);
        


        // removed functions

        function doManageResult(){
            document.querySelector('#resultTab').classList.toggle("hide", true);
            document.querySelector('#manageResultTab').classList.toggle("hide", false);
            toggleLabels();
            console.log("yey");
        }

        function toggleLabels(){
            const labelsRow = document.querySelector("#labelsRow");

            let select = document.querySelector('#selectSurveyDecision').value,
                selectCurrentLabel = select !== "NGTG" ? 
                    data.studyChecker.GTGLabel : 
                    data.studyChecker.NGTGLabel,
                checkboxCol = select !== "NGTG" ? "s6" : "s4";

            // checkbox reset
            labelsRow.innerHTML = "";
            
            selectCurrentLabel.forEach((checkbox) => {
                let newcheckbox = document.createElement('div'),
                    checkboxID = checkbox.label.replace(/\s/g,'');
                newcheckbox.classList.add("col", checkboxCol);
                newcheckbox.innerHTML = `
                    <p>
                        <input type="checkbox" class="filled-in" id="${checkboxID}" />
                        <label for="${checkboxID}">${checkbox.label}</label>
                    </p>
                `;
                labelsRow.appendChild(newcheckbox);
            });
            console.log(`labels: ${selectCurrentLabel}`);
            
        }


        // Submit
        closeCase.addEventListener('click', () =>{
            swal({
                title: "Are you sure?",
                text: "Double-check every field to avoid discrepancies.",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "blue darken-1",
                confirmButtonText: "Yes, proceed!",
                closeOnConfirm: true
            },
            function(){
                preFinish();
                doFetch();
                doFinish();
            });
        });

        // Do Insert
        // document.querySelector('#queue-select').addEventListener('change', doFetch);


        // RMTO Listener
        rmto.addEventListener('change', () => {
            if (rmto.checked === true) {
                dataChips.push({tag: "Review-Reviewed more than once"})
                $('#violations-chip').material_chip({
                    data: dataChips
                });
                // todo
                addSearch("violations-chip");

            } else {
                // dataChips.splice(dataChips.indexOf("Review-Reviewed more than once"), 1);
                console.log(dataChips);
            }
        });

        
        // Settings Listeners
        settingsDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // blsModeSwitch
        blsModeSwitch.addEventListener('change', toggleBLSMode);
        // Dark Mode Switch
        darkModeSwitch.addEventListener('change', toggleDarkMode);
        // Change Position Switch
        changePosition.addEventListener('change', togglePosition);
        
    
        // Toggle Cases Card Display
        Array.from(document.querySelectorAll('.arrow')).forEach((e) => {
            e.addEventListener('click', () => {
                console.log('toggled');
                toggleCards();
            });
        });
    
        // Queue Select Form Event Listener
        queueSelect.addEventListener('change', () => {
            let selected = queueSelect.options[queueSelect.selectedIndex].value;
            queueToggle(selected);
        });

        // Survey Decisions
        compliantBtn.addEventListener('click', () => {
            surveyDecision("compliant");
        });

        noncompliantBtn.addEventListener('click', () => {
            surveyDecision("noncompliant");
        });

        closeBtn.addEventListener('click', () => {
            surveyDecision("deleted");
        });

        

        pushsurvey();
    }

    // added functions
    function addResult(listElement, resultArray){
        // Reset result list every input trigger
        listElement.innerHTML = ``;
        
        // For each match add new li result
        resultArray.forEach((result) => {
            let searchResultItem = document.createElement('li');
            searchResultItem.classList.add('searchResultItem');
            searchResultItem.addEventListener('mousedown', autoCompleteInput);
            searchResultItem.innerHTML = `${result.name}`;
            searchResultItem.setAttribute("data-langcode", result.langCode);
            listElement.appendChild(searchResultItem);

        });
    }

    function languageListener(e){
        // filter from countries
        // return result to searchWrapper
        attachSearch(`#${e.target.id}`);
        console.log();

        let searchKeyword = e.target.value,
            languageInput = e.target,
            gridLanguage = languageInput.parentElement,
            searchWrapper = document.querySelector(`#${gridLanguage.id} > .inputWrapper`),
            resultList = searchWrapper.querySelector('.searchResultsList'),
            result = data.languageSelectOptions
                .filter(category => category
                .name
                .toLowerCase()
                .includes(searchKeyword));
        
        
        addResult(resultList, result);

        
    }

    function countryListener(e){
        // filter from countries
        // return result to searchWrapper
        attachSearch(`#${e.target.id}`);

        let searchKeyword = e.target.value,
            countryInput = e.target,
            gridCountry = countryInput.parentElement,
            searchWrapper = document.querySelector(`#${gridCountry.id} > .inputWrapper`),
            resultList = searchWrapper.querySelector('.searchResultsList'),
            result = data.countrySelectOptions
                .filter(category => category
                .name
                .toLowerCase()
                .includes(searchKeyword));
        
        
        
        addResult(resultList, result);
    }

    function attachSearch(parentID){
        
        let inputElement = document.querySelector(parentID),
            searchWrapperDiv = document.createElement('div');

        searchWrapperDiv.classList.add("inputWrapper");
        searchWrapperDiv.innerHTML = `
            <ul class="searchResultsList"></ul>
        `;
        inputElement.innerHTML = "";
        inputElement.parentElement.appendChild(searchWrapperDiv);
    }

    
   function autoCompleteInput (e){
        
        let inputElement = e.target
                        .parentElement
                        .parentElement
                        .parentElement
        .querySelector('.autocomplete');
        inputElement.value = e.target.textContent
        inputElement.setAttribute("data-langcode", e.target.dataset.langcode);
   }


    function addSearch(parent){
        let fuckinParent = document.querySelector(`#${parent}`),
            fuckinChips = document.querySelector('#violations-chip > input'),
            searchWrapperDiv = document.createElement('div');

        fuckinChips.setAttribute("placeholder", "+Review-");
        fuckinChips.addEventListener('input', getResults);
        searchWrapperDiv.setAttribute("id", "searchWrapper");
        searchWrapperDiv.innerHTML = `
            <ul id="searchResultsList"></ul>
        `;
        fuckinParent.appendChild(searchWrapperDiv);
    }
    addSearch("violations-chip");


    function getResults(e){
        let searchIndex = e.target.value,
            selectedQueue = getSelectedQueue(),
            // Filter category using searchIndex
            searchFilter = selectedQueue.filter(category => category.name.toLowerCase().includes(searchIndex)),
            searchResultsList = document.querySelector("#searchResultsList");

            

        // Reset result list every input trigger
        searchResultsList.innerHTML = ``;
        
        // For each match add new li result
        searchFilter.forEach((result) => {
            let searchResultItem = document.createElement('li');
            searchResultItem.classList.add('searchCategoryItem');

            searchResultItem.innerHTML = `${result.name}`;
            searchResultsList.appendChild(searchResultItem);
            
        });

        // change this
        let showedItems = document.querySelectorAll('.searchCategoryItem') || [];


        searchResultListener(searchFilter, showedItems);

    }

    function searchResultListener(filteredArray, resultArray){
        if (filteredArray.length != 0){

            Array.from(resultArray).forEach((item) => {
                // console.log(item);
                item.addEventListener('mousedown', (e) => {
                    dataChips.push({tag: e.target.textContent})
                    $('#violations-chip').material_chip({
                        data: dataChips
                    });
                    addSearch("violations-chip");
                });
            });
        }
    }
    


    function doCheckResult(){
    //   const url = "https://script.google.com/a/google.com/macros/s/AKfycby3ivJBSnJJLDuy2p2TkiDxMa7odg2NeTOp6ySjWJ7l/dev?action=read&id=";
    //   const url = "https://script.google.com/a/google.com/macros/s/AKfycbxuSXWJgA4yRf7GVeRXWGuFCn0kcALkzHuTMZFRUva7/dev?callback=displayResults&columnLetter=C&keyword=";
    //   const url = "https://script.google.com/a/google.com/macros/s/AKfycby3ivJBSnJJLDuy2p2TkiDxMa7odg2NeTOp6ySjWJ7l/dev?keyword=";
      const url = "https://script.google.com/a/google.com/macros/s/AKfycbw6tEzDQXsxVzmGOSNnfL9yZrCSJKxSLNxq7QriThKh/dev?action=search&keyword=";    
      let parameterID = document.querySelector('#inputID').value,
        fetchURL = url + parameterID,
        tableLoader = document.querySelector('#table-loader'),
        table = document.querySelector('#table'),
        resultTab = document.querySelector('#resultTab'),
        manageResultTab = document.querySelector('#manageResultTab');
      
      tableLoader.classList.toggle('hide');
      resultBtn.classList.toggle('disabled');
      resultTab.classList.toggle('hide', false);
      manageResultTab.classList.toggle('hide', true);
        // document.querySelector('#table-loader').classList.toggle('hide');
        // document.querySelector('#table').classList.toggle('hide');
      

      fetch(fetchURL)
        .then((response) => response.text())
            .then((data) => {
                console.log("CHECKER: " + JSON.parse(data) + typeof JSON.parse(data));
                // let array = [];
                // array.push(data);
                // // console.log("array: " + array);    
                // // console.log("data: " + typeof array)
                if (data !== null || data !== ""){
                    displayResults(JSON.parse(data));
                } else {
                    console.log("not found. add instead?");
                }
                
                tableLoader.classList.toggle('hide');
                resultBtn.classList.toggle('disabled');
                table.classList.toggle('hide', false);


                // console.log("responseText: " + data);
                // console.table(data[0]);
        })
    }

    function doAddCase(){
        
    }

    function displayResults(results){
        let arrayAgain = [],
            tbody = document.querySelector('#results'),
            justAnotherArray = [];
        Object.entries(results).forEach((e) => {
            arrayAgain.push(e[1].replace(/\"/g, ""));
        });
        // separate "results" into another array other every 10th element
        const array_chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));
        let again = array_chunks(arrayAgain, 10);
        console.log(again);
        again.pop();

        // clear tbody every after new result
        tbody.innerHTML = '';
        again.forEach((tr) => {
            console.log("tr: " + tr);
            let row = document.createElement('tr'),
                tbody = document.querySelector('#results'),
                manageResult = document.createElement('button');

            row.classList.add("result-row");

            manageResult.innerHTML = `
                    <i class="material-icons">add</i>
                `;
            manageResult.classList.add("manageResultBtn");
            
            row.appendChild(manageResult);
            tr.forEach((td) => {
                let tdElement = document.createElement('td');
                tdElement.innerHTML = td;
                row.appendChild(tdElement);
            });
            tbody.appendChild(row);
        });
    }
    

    function toggleCards(){
        const card1 = document.querySelector('#card-1'),
            card2 = document.querySelector('#card-2');

        card2.classList.toggle('show');
        card1.classList.toggle('hide');
    }
    
    function checkValidURL() {
        let url = location.href;
        if (url.includes("https://redbull.corp.google.com")) {
            console.log('Allowed URL');
            init();
        } else {
            console.log("Forbidden URL");
        }
    }

    function set_aht(min, sec){
        nmin = min;
        nsec = sec;
        nhour = 0;
    }
    

    function showFAB(){
        let fab = document.createElement('div');
        fab.classList.add('fixed-action-btn', 'click-to-toggle');
        fab.innerHTML = `
            <a id="trackBtn" class="btn-floating blue darken-1" style="width: 56px; height: 56px; line-height: 56px; border-radius: 50px;">
                <i class="large material-icons" style="font-size: 24px;">playlist_add</i>
            </a>
            <ul id="trackerUL" class="scale-transition scale-out" style="position: absolute; left: -290px; width: 400px;">
                
                <li style="margin: 0px; list-style: none!important;">
                    <div class="row">
                        <div class="col s12">
                            <div id="card-nav" style="box-sizing: border-box; background: #546e7a; color: #fff; width: 100%; height: 38px; position: block; display: flex; justify-content: space-between; padding: 16px 8px; align-items: center;">
                                <p style="font-size: 16px;">Cases Tracker</p>
                                
                                <!-- Dropdown Trigger -->
                                <a class='' id="settings-btn" href='#' data-activates='settings-dropdown' style="color: #fff;"><i class="material-icons">settings</i></a>
                              
                                <!-- Dropdown Structure -->
                                <ul id='settings-dropdown' class='dropdown-content' style="max-width: 70%; z-index: 11111111111111;">
                                    <li style="cursor: default;">
                                        <h3 style="color: #9e9e9e; margin: 0 16px;">Settings</h1>
                                    </li>
                                    <li>
                                        <a href="#!">BLS Mode</a>
                                        <div class="switch" id="blsModeSwitch" style="margin-right: 16px;">
                                            <label>
                                                Off
                                                <input type="checkbox">
                                                <span class="lever"></span>
                                                On
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="#!">Dark Mode</a>
                                        <div class="switch" id="darkModeSwitch" style="margin-right: 16px;">
                                            <label>
                                                Off
                                                <input type="checkbox">
                                                <span class="lever"></span>
                                                On
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="#!">Change Position</a>
                                        <div class="switch" id="changePosition" style="margin-right: 16px;">
                                            <label>
                                                Right
                                                <input type="checkbox">
                                                <span class="lever"></span>
                                                Left
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="#!">Coming soon!</a>
                                        <div class="switch" style="margin-right: 16px;">
                                            <label>
                                                Off
                                                <input type="checkbox">
                                                <span class="lever"></span>
                                                On
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div id="card-1" class="card" style="min-height: 400px; margin-top: 0px;">
                                <div class="card-content">
                                    <div class="row">
                                        <h1 style="font-weight: bold;" id="aht">00:00:00</h1>
                                        <div class="input-field col s12 center-align">
                                            <input id="caseID" type="text" class="validate center-align" placeholder="Case ID: 2-43060000282111" autocomplete="off">
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="card-action row">
                                    <div class="col s12" style="display: flex; justify-content: center; margin: 10px;">
                                        <a id="assignSurvey" class="primary-btn btn waves-effect blue waves-light white-text">
                                            <i class="material-icons left">playlist_play</i>TAKE
                                        </a>
                                    </div>
                                    <div class="col s12" style="display: flex; justify-content: center; margin: 10px;">
                                        <a id="unassignSurvey" class="primary-btn btn blue darken-3 waves-effect waves-light white-text disabled">
                                            <i class="material-icons left">clear_all</i>UNASSIGN
                                        </a>
                                    </div>
                                    <div class="col s12" style="display: flex; justify-content: center; margin: 10px;">
                                        <a id="consultBtn" class="primary-btn btn teal darken-1 waves-effect waves-light white-text disabled">
                                            <i class="material-icons left">question_answer</i>CONSULT
                                        </a>
                                    </div>
                                    <div class="col s12" style="display: flex; justify-content: center; margin: 10px;">
                                        <a id="consultTable" class="primary-btn btn teal darken-2 waves-effect waves-light white-text">
                                            <i class="material-icons left">question_answer</i>CONSULT TABLE
                                        </a>
                                    </div>
                                    <div class="col s12" style="display: flex; justify-content: center; margin: 10px;">
                                        <a id="needsInfoBtn" class="primary-btn btn teal darken-4 waves-effect waves-light white-text disabled">
                                            <i class="material-icons left">pause</i>NEED INFO
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <a class="downArrow arrow" style="color: #546e7a;"><i class="material-icons gray" style="font-size: 3rem;">expand_more</i></a>	
                                </div>
                            </div>
                            <div id="card-2" class="card">
                                <div class="card-content">
                                    <div class="row">   
                                        <div class="col s8">
                                            <label class="active">Queue Select</label>
                                            <select class="browser-default" id="queue-select">
                                                <option value="" disabled>Choose your option</option>
                                                <option value="Support">SUPPORT</option>
                                                <option value="Publisher">PUBLISHER</option>
                                                <option value="Survey Review" selected="selected">SURVEY REVIEW</option>
                                                <option value="Partnership">PARTNERSHIP</option>
                                            </select>
                                            
                                        </div>
                                        <div class="col s4" style="padding-top: 2rem;">
                                            <input type="checkbox" id="rmto" class="">
                                            <label for="rmto">RMTO</label>
                                        </div>
                                        
    
                                        <div id="queueChange-elements" class="col s12">
                                            <label class="active" for="violations-chip">Categories</label>
                                            <input placeholder="Review-SurveyStarted" id="searchInput" type="text" class="validate hide"  autocomplete="new-password" style="margin-bottom: 5px;">
                                            
                                            <div id="violations-chip" class="chips chips-initial chips-autocomplete" style="margin-top: 5px;">
                                                
                                            </div>
                                        </div>
                                        

                                        <div class="input-field col s12" id="grid-country">
                                            <label class="active">Country</label>
                                            <select class="browser-default hide" id="country-select">
                                                <option value="" disabled selected="selected">Select One</option>  
                                            </select>
                                            <input type="text" id="countryInput" class="autocomplete" autocomplete="new-password" placeholder="United States">
                                        </div>

                                        <div class="input-field col s12" id="grid-language">
                                            <label class="active">Language</label>
                                            <select class="browser-default hide" id="lang-select">
                                                <option value="" disabled selected="selected">Select One</option>
                                            </select>
                                            <input type="text" id="languageInput" class="autocomplete" autocomplete="new-password" placeholder="English...">
                                            
                                        </div>

                                        <div id="" class="col s12">
                                            <label class="active" for="targeting-categories">Survey Type</label>
                                            <select class="browser-default" id="targeting-categories">
                                                <option value="" disabled selected="selected">Network Type</option>
                                                <option value="BLS1">API BS</option>
                                                <option value="BLS1YT">API BSYT</option>
                                                <option value="BLS1NotYT">API BSNotYT</option>
                                                <option value="BLS2">BLS2</option>
                                                <option class="toggleable" value="Hats">Hats</option>
                                                <option class="toggleable" value="API-Internal">API-Internal</option>
                                                <option class="toggleable" value="API-External">API-External</option>
                                                <option class="toggleable" value="External">External</option>
                                                <option class="toggleable" value="Crust">Crust</option>
                                                <option class="toggleable" value="Googler">Googler</option>
                                                <option class="toggleable" value="Websat">Websat</option>
                                            </select>
                                            <div id="targeting-chips" class="chips chips-initial chips-autocomplete" style="margin-top: 5px;">
                                                
                                            </div>
                                        </div>

                                        <div class="col s6" style="display: none;">
                                            <label>RMTO</label>
                                            <select class="browser-default" id="surveystatus-select">
                                                <option value="" disabled>Review Status</option>
                                                <option value="BLS1">Yes</option>
                                                <option value="BLS1YT" selected="selected">No</option>
                                            </select>
                                        </div>

                                        <div class="col s12">
                                            <label>Customer Type</label>
                                            <select class="browser-default" id="customer-type">
                                                <option value="" disabled selected="selected">Choose your option</option>
                                                <option value="Surveys360">Surveys360</option>
                                                <option value="Googler">Googler</option>
                                                <option value="External">External</option>
                                            </select>
                                        </div>
                                        
                                        <div class="col s12">
                                            <label for="screenshot-text" class="active">Screenshot or Comments</label>
                                            <textarea value="" placeholder="Input screenshot of survey or comments here" id="screenshot-text" type="text" class="materialize-textarea validate"></textarea>
                                        </div>


                                    </div>
                                </div>
                            
                                <div id="case-actions" class="card-action row">
                                    <div class="col s6 center-align">
                                        <a id="compliant-btn" style="margin-bottom: 5px; padding: 0 8px; width: 100%;" class="btn disabled green waves-effect waves-light">
                                            <i class="material-icons left">thumb_up</i>
                                            <span class="hide-on-chrome">START</span>
                                        </a>
                                    </div>
                                    <div class="col s6 center-align">
                                        <a id="close-btn" style="margin-bottom: 5px; padding: 0 8px; width: 100%;" class="btn disabled black darken-3 waves-effect waves-light tooltipped">
                                            <i class="material-icons left">close</i>
                                            <span class="hide-on-chrome">DELETED</span>
                                        </a>
                                    </div>
                                    <div class="col s6 center-align">
                                        <a id="noncompliant-btn" style="margin-bottom: 5px; padding: 0 8px; width: 100%;" class="btn disabled red darken-3 waves-effect waves-light tooltipped">
                                            <i class="material-icons left">thumb_down</i>
                                            <span class="hide-on-chrome">NEEDS EDIT</span>
                                        </a>
                                    </div>

                                    <div class="col s6 center-align hide">
                                        <a id="blsChecker" style="margin-bottom: 5px; padding: 0 8px; width: 100%;" class="btn indigo waves-effect waves-blue tooltipped">
                                            <i class="material-icons left">search</i>
                                            <span class="hide-on-chrome">BLS Checker</span>
                                        </a>
                                    </div>
                                    
                                    <div class="col s6 offset-s3 center-align">
                                        <a id="enable_actions" style="margin-bottom: 5px; padding: 0 8px; width: 100%; color: #212121;" class="btn blue-grey lighten-5 disabled waves-effect waves-light hide tooltipped">
                                            <i class="material-icons left">arrow_back</i>
                                            <span class="hide-on-chrome">BACK</span>
                                        </a>
                                    </div>
                                    <div class="col s6 offset-s3 center-align">
                                        <a id="closeCase" style="margin-bottom: 5px; padding: 0 8px; width: 100%;" class="btn green disabled waves-effect waves-light hide tooltipped">
                                            <i class="material-icons left">send</i>
                                            <span class="hide-on-chrome">FINISH</span>
                                        </a>
                                    </div>
                                                        
                                </div>
                                <div style="text-align: center; position: relative; bottom: 40px; height: 10px;">
                                    <a class="upArrow arrow" style="color: #546e7a;"><i class="material-icons" style="font-size: 3rem;">expand_less</i></a>	
                                </div>
    

                            </div>
                        </div>       
                    </div>
                </div>
              </li>
            </ul>
        `; 
        
        document.body.appendChild(fab);
        addModal();
        addNIModal();
        $('.m-modal').modal();
        
        console.log('material chips initialized');
    }

    // 12345


    // const addCountries = data.countrySelectOptions.forEach((country) => {
    //     let newCountry = document.createElement("option");
    //     newCountry.value = country.name;
    //     newCountry.textContent = country.name;
    //     document.querySelector('#country-select').append(newCountry);
    // });

    // const addLanguage = data.languageSelectOptions.forEach((language) => {
    //     let newLanguage = document.createElement("option");
    //     newLanguage.value = language.langCode;
    //     newLanguage.textContent = language.lang;
    //     document.querySelector('#lang-select').append(newLanguage);
    // });


    function addModal(){
        let modal = document.createElement('div');
        modal.classList.add('m-modal');
        modal.setAttribute("ID", "modal1");
        modal.innerHTML = `
            <div class="m-modal-content">
                <div class="container front-page">
                    <div class="row center-align">
                        <p class="logo">
                            <font color="#4285F4">B</font>
                            <font color="#DB4437">L</font>
                            <font color="#F4B400">S</font> 
                            <font color="#4285F4">T</font>
                            <font color="#0F9D58">O</font>
                            <font color="#DB4437">O</font>
                            <font color="#4285F4">L</font>
                        </p>
                        <div class="input-field col s8 offset-s2">
                            <input placeholder="01234567" id="inputID" type="text" class="validate center-align">
                        </div>
                        <div class="input-field col s8 offset-s2" style="margin-bottom: 64px">
                            <a class="waves-effect waves-teal btn blue darken-1 white-text " id="resultBtn">Results</a>
                            <a class="waves-effect waves-teal btn blue darken-4 white-text hide" id="manageResultBtn">Manage results</a>
                        </div>
                    </div>
                </div>
                <div class="container result-page">
                    <div class="row center-align">
                        <div id="resultTab" class="col s12">
                            <div class="progress hide" id="table-loader">
                                <div class="indeterminate"></div>
                            </div>
                            <table class="centered bordered highlight hide" id="table" border=1>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th><b>BLS Tool ID</b></th>
                                        <th><b>Study/ Entity ID</b></th>
                                        <th><b>Title</b></th>
                                        <th><b>Review</b></th>
                                        <th><b>Sub-category</b></th>
                                        <th><b>Response</b></th>
                                        <th><b>Date added</b></th>
                                        <th><b>Editor</b></th>
                                        <th><b>Edit date</b></th>
                                        <th><b>Edit reason</b></th>
                                    </tr>
                                </thead>
                                <tbody id="results">
                                </tbody>
                            </table>
                        </div>
                        <div id="manageResultTab" class="col s12 hide">
                            <div class="progress hide" id="table-loader">
                                <div class="indeterminate"></div>
                            </div>
                            <div class="row">
                                <div id="addTab" class="col s12">
                                    <div class="row">
                                        <div class="input-field col s12">
                                            <input placeholder="5124666" id="surveyID" type="text" class="validate">
                                            <label class="active" for="surveyID">Survey/Entity ID</label>
                                        </div>
                                        <div class="input-field col s12">
                                            <input placeholder="Product name study" id="surveyTitle" type="text" class="validate">
                                            <label class="active" for="surveyTitle">Survey Title</label>
                                        </div>
                                        <div class="col s12" style="text-align: left;">
                                            <label>Survey Decision</label>
                                            <select id="selectSurveyDecision" class="browser-default">
                                            <option value="GTG">Good to Go(GTG)</option>
                                            <option value="NGTG">Needs Edit(NGTG)</option>
                                            </select>
                                        </div>
                                    </div>
                                
                                    
                                    <form>
                                        <div class="col s12">
                                            <div id="labelsRow" class="row">

                                                <div class="col s6">
                                                    <p>
                                                        <input type="checkbox" class="filled-in" id="filled-in-box" checked="checked" />
                                                        <label for="filled-in-box">Filled in</label>
                                                    </p>
                                                </div>


                                            </div>
                                        </div>
                                            

                                        <div class="input-field col s12">
                                            <textarea id="textarea1" class="materialize-textarea"></textarea>
                                            <label for="textarea1">Textarea</label>
                                        </div>
                                        
                                        <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                                            <i class="material-icons left">send</i>
                                        </button>
                                    </form>
                                </div>
                                <div id="updateTab" class="col s12">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    function addNIModal(){
        let modal = document.createElement('div');
        modal.classList.add('m-modal');
        modal.setAttribute("ID", "nimodal");
        modal.style.transform = 'none';
        modal.innerHTML = `
        <div class="m-modal-content">
            <div class="container front-page valign-wrapper" style="align-items: baseline; justify-content: space-between; margin: 0rem 0.5rem;">
                <h2 id="tableTitle" data-id="consulted">Consulted Cases</h2>
                <div class="" style="display: flex;">
                    <button id="btnTableConsult" class="btn waves-effect waves-light teal darken-4" style="border-radius: 0px;">Consulted</button>
                    <button id="btnTableSubmitted" class="btn waves-effect waves-light teal" style="border-radius: 0px;">Submitted</button>
                </div>
                <button class="waves-effect waves-teal btn-flat" id="getConsultedCases"><i class="material-icons">refresh</i></button>
            </div>
                <div class="row">
                    <div id="resultTab" class="col s12">
                        <div class="progress hide" id="ni-table-loader">
                            <div class="indeterminate"></div>
                        </div>
                        <table class="centered bordered highlight" id="NICasesTable" border=1>
                            <thead>
                                <tr>
                                    <th><b>LDAP</b></th>
                                    <th><b>Reference ID</b></th>
                                    <th><b>EWOQ/CASE ID</b></th>
                                    <th><b>Queue Type</b></th>                           			
                                </tr>
                            </thead>
                            <tbody id="NICasesTbody">
                            </tbody>
                        </table>
                    </div>
                </div>
        
            </div>
        </div>
        `;
        document.body.appendChild(modal);
    }

    document.querySelector('#getConsultedCases').addEventListener('click', (e) => {
        let NILoader = document.querySelector('#ni-table-loader'),
            tableTitle = document.querySelector('#tableTitle');

        NILoader.classList.toggle('hide');
        getNIBucket(tableTitle.dataset.id);
    });

    // NICasesTable
    // NICasesTbody
    function loadNITable() {
        let NICasesTable = document.querySelector('#NICasesTable'),
            NICasesTbody = document.querySelector('#NICasesTbody');

        // function doGetNIBucket
        // get NI Bucket API end point:
        // https://script.google.com/a/google.com/macros/s/AKfycbzjhgxDHp_UlzjHnsguxTpt-FOTqPkAPGnFVGJeXUw/dev?action=read&tab=Consulted%20Bucket
        // getNIBucket();
        
        // let tableData = getNIBucket();
        // await new Promise((resolve, reject) => setTimeout(resolve, 3000));
        // console.log("tableData LNT: " + tableData);
        // if (tableData) {
        //     let tbody = tableData.map((e) => {
        //         return e[0],e[2],e[3],e[4];
        //     });
        // }
        
        // console.log("tbody: " + tbody);
        
    }

    // loadNITable();

    function getNIBucket (tableSelected){
        const urlConsulted = `https://script.google.com/a/google.com/macros/s/AKfycbzjhgxDHp_UlzjHnsguxTpt-FOTqPkAPGnFVGJeXUw/dev?action=read&tab=Consulted%20Bucket`;
        const urlSubmitted = `https://script.google.com/a/google.com/macros/s/AKfycbzjhgxDHp_UlzjHnsguxTpt-FOTqPkAPGnFVGJeXUw/dev?action=read&tab=All%20Cases`;
        let url = tableSelected === "submitted" ? urlSubmitted : urlConsulted;
        console.log('fetching');
        fetch(url)
        .then((resp) => resp.json())
        .then(function(data){
            // swal("Success!", "Case has been successfully tracked", "success");
            // console.table(data.response);
            // console.table(data.records);
            // SAME SHIT LOADER
            document.querySelector('#ni-table-loader').classList.toggle('hide');

            if (data.records) {
                let tbody = data.records.map((e) => {
                    let array = [];
                    array.push(e["LDAP"]);
                    array.push(e["Reference ID"]);
                    array.push(e["EWOQ/CASE ID"]);
                    array.push(e["Queue Type"]);

                    // case data object
                    array.push(e);
                    return array;
                });
                let NICasesTable = document.querySelector('#NICasesTable'),
                    NICasesTbody = document.querySelector('#NICasesTbody');

                NICasesTbody.innerHTML = "";
                tbody.reverse();
                
                tbody.forEach((c) => {
                    let tr = document.createElement('tr');
                    tr.style.cursor = "pointer";
                    tr.setAttribute("data-id", c[1]);

                    // setting data- "record" in HTML
                    tr.setAttribute("data-record", JSON.stringify(c[4]));

                    // remove last element which is the data object
                    c.pop();
                    // creates a TD foreach element in array
                    c.forEach(cd => {
                        let td = document.createElement('td');
                        td.innerText = cd;
                        
                        tr.appendChild(td);
                    });
                    
                    NICasesTbody.appendChild(tr);
                });
                // console.log(tbody);

                let NICases = document.querySelectorAll('#NICasesTbody > tr'),
                    tableTitle = document.querySelector('#tableTitle');

                if(tableTitle.dataset.id == 'consulted'){
                    NICases.forEach(e => {
                        e.addEventListener('click', (td) => {
                            swal({
                                title: "Are you sure?",
                                text: "This case will be assigned to you",
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonClass: "blue darken-1",
                                confirmButtonText: "Yes, proceed!",
                                closeOnConfirm: true
                            },
                            function(){
                                // preFinish();
                                // doFetch();
                                // doFinish();
                                let caseRef = td.target.parentElement.dataset.id;
                                let matchedCase = data.records;
                                let arrayObject = Object.entries(matchedCase);
    
                                let caseFound = arrayObject.filter(e => e[1]["Reference ID"] == caseRef);
                                let caseFinal = caseFound.shift();
                                let caseFoundObject = caseFinal[1];
    
    
                                // if (local)
                                // let assigned = JSON.parse(localStorage.getItem('assigned'));
                                let assigned = {};
        
                                // assigned["decision"] = decision;
                                assigned["survey_ids"] = caseFoundObject["EWOQ/CASE ID"];
                                assigned["start_time"] = caseFoundObject["Start Time MNL"];
                                localStorage.setItem("assigned", JSON.stringify(assigned));
                                pushsurvey();
                                
    
                                console.log("case: " + JSON.stringify(caseFoundObject));
                                
                                const url = `https://script.google.com/a/google.com/macros/s/AKfycbzjhgxDHp_UlzjHnsguxTpt-FOTqPkAPGnFVGJeXUw/dev?action=delete&tab=Consulted%20Bucket&id=${caseRef}`;
                                fetch(url)
                                .then((resp) => resp.json())
                                .then(function(data){
                                    console.log(data.message);
                                    if (data.message == 'deleted successfully'){
                                        getNIBucket();
                                        console.log("table reloaded");
                                    }
                                });
    
                                // close modal
                                $('#nimodal').modal('close');
    
                            });
                        });
                    });
                } else if (tableTitle.dataset.id == 'submitted'){
                    let card = document.createElement('div'),
                                parent = document.querySelector('#nimodal');
                                card.classList.add('card', 'white');
                                card.style.position = "fixed";
                                card.style.display = "none";

                    
                                
                            // parent.appendChild(card);
                    NICases.forEach((e) => {
                        e.addEventListener('mousemove', (td) => {
                            let tdData = JSON.parse(td.target.parentElement.dataset.record),
                                aht = getFormmatedAHT(tdData.AHT);
                            // console.log(JSON.parse(td.target.parentElement.dataset.record));
                            console.log(td.target.parentElement.parentElement.id);
                            console.log(td.currentTarget.dataset.record);

                            let closeCard = function close(e){
                                console.log(e + e.currentTarget);
                            }

                            if (td.target.parentElement.parentElement.id === "NICasesTbody"){
                                parent.appendChild(card);
                                card.style.display = "block";
                            } else {
                                card.style.display = "none";
                            }
                            
                            // appendCard to body
                                card.classList.add('case-card');
                                card.style.left = `${td.screenX +15}px`;
                                card.style.top = `${td.screenY + -180}px`;
                                
                                
                                card.innerHTML = `
                                    <div style="display: flex; justify-content: flex-end;">
                                        <a id="testLink" onclick="function hi(e){
                                            document.querySelector('#testLink').parentElement.parentElement.remove();
                                        };hi()" style="cursor: pointer;">
                                            <i class="material-icons">close</i>
                                        </a>
                                    </div>
                                    <div class="card-item">
                                        <label style="margin-right: 5px;">LDAP:</label>
                                        <p class=""> ${tdData.LDAP}</p>
                                    </div>
                                    <div class="card-item">
                                        <label style="margin-right: 5px;">Categories: </label>
                                        <p class=""> ${tdData.Categories}</p>
                                    </div>
                                    <div class="card-item">
                                        <label style="margin-right: 5px;">AHT:</label>
                                        <p class=""> ${aht}</p>
                                    </div>
                                    <div class="card-item">
                                        <label style="margin-right: 5px;">Screenshot/Comments:</label>
                                        <p class="" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"> ${tdData["Screenshot/Comments"]}</p>
                                    </div>
                                `;

                                
                            
                        });
                    })
                }
                
                console.log(NICases);

            }
            // return data.records;    
        })
        .catch(function(error) {
            if (error == "SyntaxError: Unexpected end of JSON input"){
                let tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>No consulted case</td>
                        <td>No consulted case</td>
                        <td>No consulted case</td>
                        <td>No consulted case</td>
                    `;
                NICasesTbody.appendChild(tr);
            } else {
                swal("Failed!", "There seems to be a problem in retrieving NI cases.", "error");
            }
            document.querySelector('#ni-table-loader').classList.toggle('hide');
            console.log(error);
        }); 
    }



  function getFormmatedAHT(date){
    let d = date != "" && date != null ? new Date(date) : "",
        aht = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

    return aht;
  }


  function getSelectedQueue(){
    let selected = queueSelect.options[queueSelect.selectedIndex].value,
        categoryData = data.SRCategories;
    //   SRCategories
    //   supportCategories
    //   pubCategories
    //   partnershipCategories

    if (selected == "Survey Review") {
        categoryData = data.SRCategories;
    } else if(selected == "Support") {
        categoryData = data.supportCategories;
    } else if(selected == "Publisher") {
        categoryData = data.pubCategories;
    } else if(selected == "Partnership"){
        categoryData = data.partnershipCategories;
    } else {
        console.log('Invalid queue: ' + selected);
    }
    return categoryData;
  }

  function clearClass(){
      customerTypeSelect = document.querySelector('#customer-type'),
      surveyStatusSelect = document.querySelector('#surveystatus-select'),
    //   surveyTypeSelect = document.querySelector('#surveytype-select'),
    //   countrySelect = document.querySelector('#country-select'),
      countryInput = document.querySelector('#countryInput'),
    //   langSelect = document.querySelector('#lang-select'),
      languageInput = document.querySelector('#languageInput'),
      queueSelect = document.querySelector('#queue-select');

      queueSelect.parentElement.classList.remove('s12');
      customerTypeSelect.parentElement.classList.remove('hide');
      surveyStatusSelect.parentElement.classList.remove('hide');
      // surveyTypeSelect.parentElement.classList.remove('hide');
      // countrySelect.parentElement.classList.toggle('hide', false);
    //   langSelect.parentElement.classList.remove('hide');
      languageInput.parentElement.classList.remove('hide');
      toggleDecisionBtn();
      
  }

  function returnCategories(array){
    let categories = [];
    array.forEach((category) => {
        categories.push(`<option value="${category.name}">${category.name}</option>`);
    });
    return categories;
  }

    function surveyReviewQueue(){
        clearClass();
        toggleDecisionBtn();
        const customerTypeSelect = document.querySelector('#customer-type'),
            surveyStatusSelect = document.querySelector('#surveystatus-select'),
            surveyTypeSelect  = document.querySelector('#targeting-categories'),
            rmto = document.querySelector('#rmto');
            queueSelect = document.querySelector('#queue-select');

        queueSelect.parentElement.classList.add('s8');
        surveyStatusSelect.parentElement.classList.remove('hide');
        surveyTypeSelect.parentElement.classList.remove('hide');    
        rmto.parentElement.classList.remove('hide');
        customerTypeSelect.parentElement.classList.add('hide');
    }



    function supportQueue(){
        clearClass();
        toggleDecisionBtn();

        // Toggle elements
        const customerTypeSelect = document.querySelector('#customer-type'),
            surveyStatusSelect = document.querySelector('#surveystatus-select'),
            backBtn = document.querySelector('#enable_actions'),
            rmto = document.querySelector('#rmto'),
            queueSelect = document.querySelector('#queue-select'),
            blsChecker = document.querySelector('#blsChecker'),
            targetingCategories = document.querySelector('#targeting-categories');
            
        // customerTypeSelect.parentElement.classList.toggle('hide');
        rmto.parentElement.classList.toggle('hide');
        queueSelect.parentElement.classList.toggle("s8");
        queueSelect.parentElement.classList.toggle("s12");
        // hide targeting categories on Support queue
        targetingCategories.parentElement.classList.add('hide');
        surveyStatusSelect.parentElement.classList.add('hide');
        backBtn.classList.add('hide');
        blsChecker.parentElement.classList.add('hide');
        // surveyTypeSelect.parentElement.classList.add('hide');
        
    }

    function publisherQueue(){
        clearClass();
        // toggleDecisionBtn();
        // Toggle elements
        const customerTypeSelect = document.querySelector('#customer-type'),
            surveyStatusSelect = document.querySelector('#surveystatus-select'),
            surveyTypeSelect = document.querySelector('#targeting-categories'),
            countryInput = document.querySelector('#countryInput'),
            languageInput = document.querySelector('#languageInput'),
            queueSelect = document.querySelector('#queue-select');
            // fix rmto overflowing 
            queueSelect.parentElement.classList.toggle("s8");
            // queueSelect.parentElement.classList.toggle("s12");

            customerTypeSelect.parentElement.classList.add('hide');
            surveyStatusSelect.parentElement.classList.add('hide');
            surveyTypeSelect.parentElement.classList.add('hide');
            countryInput.parentElement.classList.add('hide');
            languageInput.parentElement.classList.add('hide');

    }

    function partnershipQueue(){
        clearClass();
        toggleDecisionBtn();
        // Toggle elements
        const customerTypeSelect = document.querySelector('#customer-type'),
            surveyStatusSelect = document.querySelector('#surveystatus-select'),
            // surveyTypeSelect = document.querySelector('#surveytype-select'),
            // countrySelect = document.querySelector('#country-select'),
            countryInput = document.querySelector('#countryInput'),
            // langSelect = document.querySelector('#lang-select');
            languageInput = document.querySelector('#languageInput');


        customerTypeSelect.parentElement.classList.add('hide');
        surveyStatusSelect.parentElement.classList.add('hide');
        // surveyTypeSelect.parentElement.classList.add('hide');
        countryInput.parentElement.classList.add('hide');
        languageInput.parentElement.classList.add('hide');       

    }

    function pushsurvey() {
        if(localStorage.getItem("assigned") != null){
            enableButtons();
            let raw = JSON.parse(localStorage.getItem("assigned"));
                assigned_survey = raw["survey_ids"],
                start_time = raw["start_time"],
                end_time = raw["end_time"],
                needs_info = raw["needs_info"];
                

            // Re-assign values
            caseID.value = assigned_survey;


            // Toggle State
            assignSurvey.classList.add("disabled");
            unassignSurvey.classList.toggle("disabled");
            caseID.disabled = true;

            if (needs_info === true) {

                // needsInfoBtn.classList.toggle("disabled");

                let date = new Date(end_time);
                    aht = Math.abs(new Date(date) - new Date(start_time));
                    min = Math.floor((aht/1000)/60);
                    sec = Math.floor((aht/1000)%60);
                set_aht(min, sec);
                AHT();
            } else {
                let date = new Date(),
                    aht = Math.abs(new Date(date) - new Date(start_time)),
                    min = Math.floor((aht/1000)/60),
                    sec = Math.floor((aht/1000)%60);
                set_aht(min, sec);
                AHT();
                refreshInterval = setInterval(AHT, 1000); 
                needsInfoBtn.classList.toggle("disabled");
            }
        }
        
    }



    function gatherData() {
        console.log('Gathering data');
        // queueSelect.options[queueSelect.selectedIndex].value
        var data_chips= $('#violations-chip').material_chip('data'),
            categoryString = "";
        for(var i = 0; i < dataChips.length; i++) {
            categoryString += `${dataChips[i].tag}, `;
        }
        let dataChipsTag = dataChips.map(e => e.tag);
        // categoryString = encodeURIComponent(categoryString.replace(/,\s*$/, ""));
        categoryString = encodeURIComponent(dataChipsTag.join());

        let targeting_data = $('#targeting-chips').material_chip('data'),
            targetingString = "";
        targeting_data.forEach((chip) => {
            targetingString += chip.tag + ',';
        });
        targetingString = targetingString.replace(/,\s*$/, "");

        let queueSelect = document.querySelector('#queue-select'),
            // violationsChip = document.querySelector('#violations-chip'),
            // countrySelect = document.querySelector('#country-select'),
            countryInput = document.querySelector('#countryInput'),
            // langSelect = document.querySelector('#lang-select'),
            languageInput = document.querySelector('#languageInput'),
            rmto = document.querySelector('#rmto'),
            surveyStatusSelect = document.querySelector('#surveystatus-select'),
            screenshotText = document.querySelector('#screenshot-text');

        let caseData = {
            queue: queueSelect.options[queueSelect.selectedIndex].value,
            violations: categoryString,
            country: countryInput.value,
            language: languageInput.dataset.langcode,
            RMTO: rmto.checked? "yes" : "no",
            surveyType: targetingString,
            surveyStatus: surveyStatusSelect.options[surveyStatusSelect.selectedIndex].value,
            screenshotText: screenshotText.value
        };



        console.log(caseData);
        return caseData;
    }

    // Persistent Storage
    function pushsurvey() {
        if(localStorage.getItem("assigned") != null){
            enableButtons();
            let raw = JSON.parse(localStorage.getItem("assigned"));
                assigned_survey = raw["survey_ids"],
                start_time = raw["start_time"],
                end_time = raw["end_time"],
                needs_info = raw["needs_info"];

            // Re-assign values
            caseID.value = assigned_survey;


            // Toggle State
            assignSurvey.classList.add("disabled");
            unassignSurvey.classList.toggle("disabled");
            caseID.disabled = true;

            if (needs_info === true) {

                // needsInfoBtn.classList.toggle("disabled");

                let date = new Date(end_time);
                    aht = Math.abs(new Date(date) - new Date(start_time));
                    min = Math.floor((aht/1000)/60);
                    sec = Math.floor((aht/1000)%60);
                set_aht(min, sec);
                AHT();
            } else {
                let date = new Date(),
                    aht = Math.abs(new Date(date) - new Date(start_time)),
                    min = Math.floor((aht/1000)/60),
                    sec = Math.floor((aht/1000)%60);
                set_aht(min, sec);
                AHT();
                refreshIntervalId = setInterval(AHT, 1000); 
                needsInfoBtn.classList.toggle("disabled");
            }
        }
       
    }

    function surveyDecision(decision){
        if  (!localStorage.assigned){
            console.log('There is assigned survey.');
        } else {
            let data = gatherData(),
            assigned = JSON.parse(localStorage.getItem('assigned'));
    
            assigned["decision"] = decision;
            localStorage.setItem("assigned", JSON.stringify(assigned));

            toggleDecisionBtn();
        }
    }


    function toggleDecisionBtn(){
       const compliantBtn = document.querySelector('#compliant-btn'),
        noncompliantBtn = document.querySelector('#noncompliant-btn'),
        closeBtn = document.querySelector('#close-btn'),
        enable_actions = document.querySelector('#enable_actions'),
        closeCase = document.querySelector('#closeCase'),
        blsChecker = document.querySelector('#blsChecker'),
        blsMode = JSON.parse(localStorage.settings).bls_mode;

        console.log("mode: " + blsMode);

        let blsCheckerToggle = blsMode ? blsChecker.parentElement.classList.toggle('hide') : "Hiding bls checker...";

        compliantBtn.classList.toggle('hide');
        noncompliantBtn.classList.toggle('hide');
        closeBtn.classList.toggle('hide');
        enable_actions.classList.toggle('hide');
        closeCase.classList.toggle('hide');
    }

    function queueToggle(queueSelected){
        console.log('Selected: ' + queueSelected);
        if (queueSelected == "Survey Review") {
            surveyReviewQueue();
        } else if(queueSelected == "Support") {
            supportQueue();
        } else if(queueSelected == "Publisher") {
            publisherQueue();
        } else if(queueSelected == "Partnership"){
            partnershipQueue();
        } else {
            console.log('Invalid queue: ' + queueSelected);
        }
    }
        
    // Test Fetch
    function doFetch() {
        const url = `https://script.google.com/a/google.com/macros/s/AKfycbzjhgxDHp_UlzjHnsguxTpt-FOTqPkAPGnFVGJeXUw/dev?action=insert&${getParameters()}`;
        console.log('fetching');
        fetch(url)
        .then((resp) => resp.json())
        .then(function (data){
            swal("Success!", "Case has been successfully tracked", "success");
            return data.response;    
        })
        .catch(function(error) {
          swal("Failed!", "There seems to be a problem in tracking the case.", "error");
          console.log(error);
        });   

    }
  


    function initDarkMode(){
        let settings = JSON.parse(localStorage.getItem('settings')),
            card1 = document.querySelector('#card-1'),
            card2 = document.querySelector('#card-2'),
            settingsDropdown = document.querySelector('#settings-dropdown'),
            cardNav = document.querySelector('#card-nav'),
            darkModeSwitch = document.querySelector('#darkModeSwitch > label > input[type=checkbox]'),
            nimodal = document.querySelector('#nimodal > .m-modal-content');
            

        darkModeSwitch.toggleAttribute("checked");

        nimodal.classList.toggle('card-d-mode');

        card1.classList.toggle('card-d-mode');
        card2.classList.toggle('card-d-mode');
        settingsDropdown.classList.toggle('card-d-mode');
        cardNav.classList.toggle('nav-d-mode');
    }

    function toggleDarkMode(){
        let settings = JSON.parse(localStorage.getItem('settings'));
        initDarkMode();
        if (settings.dark_mode === true){
            settings.dark_mode = false;
            localStorage.setItem("settings",JSON.stringify(settings));
        } else if (settings.dark_mode === false) {
            settings.dark_mode = true;
            localStorage.setItem("settings",JSON.stringify(settings));
        }
    }

    function checkDarkMode(){
        let settings = JSON.parse(localStorage.getItem('settings'));
        settings.dark_mode === true ? initDarkMode() : console.log("Dark Mode Deactivated");
    }

    function initPosition(){
        let settings = JSON.parse(localStorage.getItem('settings')),
            fab = document.querySelector('.fixed-action-btn'),
            trackerUL = document.querySelector('#trackerUL'),
            changePosition = document.querySelector('#changePosition > label > input[type=checkbox]');
        
        fab.classList.toggle('fab-change-pos');
        trackerUL.classList.toggle('card-change-pos');
            
        // toggle change position switch
        changePosition.toggleAttribute("checked");
    }

    function togglePosition(){
        let settings = JSON.parse(localStorage.getItem('settings'));
        initPosition();
        if (settings.change_position === true){
            settings.change_position = false;
            localStorage.setItem("settings",JSON.stringify(settings));
        } else if (settings.change_position === false) {
            settings.change_position = true;
            localStorage.setItem("settings",JSON.stringify(settings));
        }
    }

    function checkPosition(){
        let settings = JSON.parse(localStorage.getItem('settings'));
        settings.change_position === true ? initPosition() : console.log("Position Changed!");
    }

    function initBLSMode(){
        let countryInput = document.querySelector('#countryInput'),
            // countrySelect = document.querySelector('#country-select'),
            // langSelect = document.querySelector('#lang-select'),
            languageInput = document.querySelector('#languageInput'),
            queueSelect = document.querySelector('#queue-select'),
            targetingCategories = document.querySelector('#targeting-categories'),
            blsSwitch = document.querySelector('#blsModeSwitch > label > input[type=checkbox]'),
            rmto = document.querySelector('#rmto'),
            blsChecker = document.querySelector('#blsChecker');
            
        blsSwitch.toggleAttribute("checked");
        blsChecker.parentElement.classList.toggle('hide');

        queueSelect.parentElement.classList.toggle('s8');
        queueSelect.parentElement.classList.toggle('s12');
        rmto.parentElement.classList.toggle('hide');


        countryInput.parentElement.classList.toggle('hide');
        // langSelect.parentElement.classList.toggle('s6');
        // langSelect.parentElement.classList.toggle('s12');

        Array.from(document.querySelectorAll('.toggleable')).forEach((e) => {
            e.classList.toggle('hide');
        });
        
        // console.log(countrySelect.parentElement.classList + langSelect.parentElement.classList);
    }

    function toggleBLSMode(){
        // toggle core to bls
        let settings = JSON.parse(localStorage.getItem('settings'));
        initBLSMode();

        var status = $(this).prop('checked');
        console.log(status);

        if (settings.bls_mode === true){
            settings.bls_mode = false;
            localStorage.setItem("settings",JSON.stringify(settings));

        } else if (settings.bls_mode === false) {
            settings.bls_mode = true;
            localStorage.setItem("settings",JSON.stringify(settings));
        }

    }

    function checkBLSMode(){
        let settings = JSON.parse(localStorage.getItem('settings'));
        return settings.bls_mode === true ? initBLSMode() : console.log("BLS Mode Deactivated");
    }

    function checkNeedsInfo(){
        let assigned = JSON.parse(localStorage.getItem('assigned'));
        return assigned.needs_info === true ?  true : false;
    }
        
    function disableButtons(){
        let assignBtn = document.querySelector('#assignSurvey'),
            unassignBtn = document.querySelector('#unassignSurvey'),
            needsInfoBtn = document.querySelector('#needsInfoBtn'),
            consultBtn = document.querySelector('#consultBtn'),
            caseIDInput = document.querySelector('#caseID');
        
        
        caseIDInput.toggleAttribute("disabled");
        assignBtn.classList.toggle("disabled");
        unassignBtn.classList.toggle("disabled");
        needsInfoBtn.classList.toggle("disabled");
        consultBtn.classList.toggle("disabled");
        clearInterval(refreshIntervalId);
    }

    function enableButtons(){
        const compliantBtn = document.querySelector('#compliant-btn'),
            closeBtn = document.querySelector('#close-btn'),
            noncompliantBtn = document.querySelector('#noncompliant-btn'),
            enable_actions = document.querySelector('#enable_actions'),
            closeCase = document.querySelector('#closeCase');
        
        compliantBtn.classList.toggle('disabled');
        closeBtn.classList.toggle('disabled');
        noncompliantBtn.classList.toggle('disabled');
        enable_actions.classList.toggle('disabled');
        closeCase.classList.toggle('disabled');
    }
    
    function checkValidInput(element, callback){
        if (!element.value) {
            return console.log("empty/invalid input: " +element.value);
        } else {
            callback();
        }
    }

    function getFormattedDate(){
        let date = new Date(),
        formattedDate = (date.getMonth() + 1) + '/' + date.getDate() +  "/" + date.getFullYear();
        return formattedDate = formattedDate + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
    
    function doAssign(){
        refreshInterval = setInterval(AHT, 1000),
        nmin = 0,
        nsec = 0,
        nhour = 0;

        let startDate = getFormattedDate();
        let caseIDInput = document.querySelector('#caseID');
        let caseID = Array.from(caseIDInput.value.split(","));
    
        if (!localStorage.assigned){
          localStorage.setItem("assigned",JSON.stringify({ 
              "survey_ids": caseID,
              "start_time": startDate
            }));
          } else {
            console.log('There is assigned survey.');
        }
        toggleCards();
        disableButtons();
        enableButtons();
    }

    function clearCardValues(){
        dataChips = [];
        targetingChips = [];
        surveyReviewQueue();
        
        let queueSelect = document.querySelector('#queue-select'),
        violationsChip = document.querySelector('#violations-chip'),
        // countrySelect = document.querySelector('#country-select'),
        countryInput = document.querySelector('#countryInput'),
        // langSelect = document.querySelector('#lang-select'),
        languageInput = document.querySelector('#languageInput'),
        rmto = document.querySelector('#rmto'),
        surveyStatusSelect = document.querySelector('#surveystatus-select'),
        screenshotText = document.querySelector('#screenshot-text'),
        targetingCategories = document.querySelector('#targeting-categories');
        
        targetingCategories.selectedIndex = 0,
        queueSelect.selectedIndex = 3,
        countryInput.value = "",
        countryInput.dataset.langcode = "",
        languageInput.value = "",
        languageInput.dataset.langcode = "",
        rmto.checked = false,
        surveyStatusSelect.selectedIndex = 0,
        $(".chips .chip").remove(),
        screenshotText.value = "";
    }

    function preFinish(){
        let assigned = JSON.parse(localStorage.getItem('assigned')),
            caseID = document.querySelector('#caseID'),
            caseIDArray = caseID.value.split(",").length,
            caseInteractions = caseIDArray != 1 || 0 ? caseIDArray : 1,
        endDate = checkNeedsInfo() ? assigned.end_time : getFormattedDate(),
        aht = Math.abs(new Date(endDate) - new Date(assigned.start_time)),
        min = Math.floor((aht/1000)/60),
        sec = Math.floor((aht/1000)%60);

        assigned["number_of_interactions"] = caseInteractions;
        assigned["end_time"] = endDate; 
        assigned["aht"] = "00:" + min + ':' + sec;

        let data = gatherData();

        // assigned["decision"] = data.decision;

        assigned["queue"] = data.queue;
        assigned["violations"] = data.violations;
        assigned["country"] = data.country;
        assigned["language"] = data.language;
        assigned["surveyType"] = data.surveyType;
        assigned["RMTO"] = data.RMTO;
        assigned["surveyStatus"] = data.surveyStatus;
        assigned["screenshotText"] = data.screenshotText;
        
        localStorage.setItem("assigned", JSON.stringify(assigned));
    }

    function doFinish(){
        let caseIDInput = document.querySelector('#caseID'),
            aht = document.querySelector('#aht');
            aht.textContent = "00:00:00";
            caseIDInput.value = "";
            localStorage.removeItem("assigned");
        needsInfoBtn.classList.toggle('disabled', false);
        disableButtons();
        clearInterval(refreshInterval);
        toggleCards();
        clearCardValues();
        enableButtons();
        toggleDecisionBtn();
    }
    
    function doUnassign(){
        let caseIDInput = document.querySelector('#caseID'),
            aht = document.querySelector('#aht');
            aht.textContent = "00:00:00";
            caseIDInput.value = "";
            localStorage.removeItem("assigned");
        needsInfoBtn.classList.remove('disabled');
        surveyReviewQueue();
        disableButtons();
        enableButtons();
        clearInterval(refreshInterval);
    }

    function doConsult(){
        console.log("consult clicked");

        // Set Case Data

        dataChips.push({tag: "Review-Consult"})
        $('#violations-chip').material_chip({data: dataChips});
        addSearch("violations-chip");
        // assign data to LS
        preFinish();

        // Fetch Case Data
        // https://script.google.com/a/google.com/macros/s/AKfycbzjhgxDHp_UlzjHnsguxTpt-FOTqPkAPGnFVGJeXUw/dev?action=insert&tab=Needs%20Info%20bucket
        getParameters();

        const url = `https://script.google.com/a/google.com/macros/s/AKfycbzjhgxDHp_UlzjHnsguxTpt-FOTqPkAPGnFVGJeXUw/dev?action=insert&tab=Consulted%20Bucket&${getParameters()}`;
        console.log('fetching');
        fetch(url)
        .then((resp) => resp.json())
        .then(function (data){
            swal("Success!", "Case has been added to Consulted Bucket", "success");
            return data.response;    
        })
        .catch(function(error) {
          swal("Failed!", "There seems to be a problem in tracking the case.", "error");
          console.log(error);
        });
        


        // // Reset Case Data
        doUnassign();
        // doClearConsult();
    }

    function doClearConsult(){
        let caseIDInput = document.querySelector('#caseID'),
            aht = document.querySelector('#aht');
            aht.textContent = "00:00:00";
            caseIDInput.value = "";
            localStorage.removeItem("assigned");
            needsInfoBtn.classList.toggle('disabled', false);

        disableButtons();
        // caseIDInput.toggleAttribute("disabled");
        clearInterval(refreshInterval);
        clearCardValues();
        // toggleDecisionBtn();
    }
    
    function doNeedsInfo(){
        let assigned = JSON.parse(localStorage.getItem('assigned')),
            aht = Math.abs(new Date() - new Date(assigned["start_time"])),
            needsInfoBtn = document.querySelector('#needsInfoBtn');
        
        needsInfoBtn.classList.toggle('disabled');
        assigned["needs_info"] = true;   
        assigned["end_time"] = getFormattedDate();
        assigned["aht"] = aht;
        localStorage.setItem("assigned", JSON.stringify(assigned));

        dataChips.push({tag: "Review-NeedsInfo"})
        $('#violations-chip').material_chip({
            data: dataChips
        });
        // todo
        addSearch("violations-chip");
        clearInterval(refreshInterval);
    }
    
    
    function getParameters(){
        let assigned = JSON.parse(localStorage.getItem('assigned'));


        let reviewStatus = "reviewStatus=reviewed",
            referenceID = `referenceID=`,
            caseID = `caseID=${assigned.survey_ids}`,
            queueType = `queueType=${assigned.queue}`,
            customerType = `customerType=`,
            tool = `tool=${caseID.includes("-") ? "Cases 2.0" : "EWOQ"}`,
            language = `language=${assigned.language}`,
            country = `country=${assigned.country}`,
            RMTO = `RMTO=${assigned.RMTO}`,
            surveyType = `surveyType=${assigned.surveyType}`,
            screenshot = `screenshot=${assigned.screenshotText}`,
            surveyDecision = `surveyDecision=${assigned.queue == "Support" ? "" : assigned.decision}`,
            startTimeMNL = `startTimeMNL=${assigned.start_time}`,
            startTimePST = `startTimePST=`,
            endTimeMNL = `endTimeMNL=${assigned.end_time}`,
            categories = `categories=${assigned.violations}`,
            AHT = `AHT=${assigned.aht}`,
            numberOfInteractions = `numberOfInteractions=${assigned.number_of_interactions}`;
        
        return `${reviewStatus}&${referenceID}&${caseID}&${queueType}&${customerType}&${tool}&${language}&${country}&${RMTO}&${surveyType}&${screenshot}&${surveyDecision}&${startTimeMNL}&${startTimePST}&${endTimeMNL}&${categories}&${AHT}&${numberOfInteractions}`;
    }
    
    function AHT() {
        document.querySelector('#aht').innerText = nhour + ":" + nmin + ":" + nsec;
        if (!isPaused) {
            nsec += 1;
            if (nsec == 60) {
                nsec = 00;
                nmin += 1;
            } else if (nmin == 60) {
                nmin = 00;
                nhour += 1;
            }
        }
    }
});



