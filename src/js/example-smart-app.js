(function (window) {
    var list = [];
    var objData = [];

    window.extractData = function () {
        var ret = $.Deferred();

        function onError() {
            console.log('Loading error', arguments);
            ret.reject();
        }

        function onReady(smart) {
            if (smart.hasOwnProperty('patient')) {
                var patient = smart.patient;
                var pt = patient.read();

                var obv = smart.patient.api.fetchAll({
                    type: 'Observation',
                    query: {
                        code: {
                            $or: ['http://loinc.org|8302-2', 'http://loinc.org|8462-4',
                                'http://loinc.org|8480-6', 'http://loinc.org|2085-9',
                                'http://loinc.org|2089-1', 'http://loinc.org|55284-4']
                        }
                    }
                });

                $.when(pt, obv).fail(onError);

                $.when(pt, obv).done(function (patient, obv) {
                    $("#patietid").val(patient.id);
                    var byCodes = smart.byCodes(obv, 'code');
                    var gender = patient.gender;

                    var fname = '';
                    var lname = '';
                    var phone = '';
                    var email = '';
                    var PractitionerID = '';

                    if (patient.hasOwnProperty('name')) {
                        if (typeof patient.name[0] !== 'undefined') {
                            if (patient.name.hasOwnProperty('given')) {
                                fname = patient.name[0].given.join(' ');
                            }
                            if (patient.name.hasOwnProperty('family')) {
                                lname = patient.name[0].family;
                            }
                            else if (patient.name.length == 3) {
                                fname = patient.name[1].family;
                                lname = patient.name[1].given[0];
                            }
                        }
                    }

                    if (patient.hasOwnProperty('generalPractitioner')) {
                        if (patient.generalPractitioner[0].hasOwnProperty('reference')) {
                            PractitionerID = patient.generalPractitioner[0].reference.split('/')[1];
                        }
                    }

                    if (patient.hasOwnProperty('telecom')) {
                        if (typeof patient.telecom[0] !== 'undefined') {
                            phone = patient.telecom[0].value;
                        }
                        if (typeof patient.telecom[1] !== 'undefined') {
                            email = patient.telecom[1].value;
                        }
                    }

                    var height = byCodes('8302-2');
                    var systolicbp = getBloodPressureValue(byCodes('55284-4'), '8480-6');
                    var diastolicbp = getBloodPressureValue(byCodes('55284-4'), '8462-4');
                    var hdl = byCodes('2085-9');
                    var ldl = byCodes('2089-1');

                    var p = defaultPatient();
                    p.birthdate = patient.birthDate;
                    p.gender = gender;
                    p.fname = fname;
                    p.lname = lname;
                    p.phone = phone;
                    p.email = email;
                    p.height = getQuantityValueAndUnit(height[0]);

                    if (typeof systolicbp != 'undefined') {
                        p.systolicbp = systolicbp;
                    }

                    if (typeof diastolicbp != 'undefined') {
                        p.diastolicbp = diastolicbp;
                    }

                    p.hdl = getQuantityValueAndUnit(hdl[0]);
                    p.ldl = getQuantityValueAndUnit(ldl[0]);

                    ret.resolve(p);

                        if (obv != null) {
                            if (obv.length > 0) {
                                for (var i = 0; i <= 10; i++) {
                                    if (obv[i] != null && obv[i].resourceType != "OperationOutcome") {
                                        if (obv[i] != undefined) {
                                            var patientObservation = {};
                                            var title = obv[i].code.coding[0].display;
                                            var recordeddate = obv[i].issued;
                                            patientObservation.obvID = obv[i].id;
                                            patientObservation.Description = obv[i].code.text;
                                            patientObservation.description = "Observation - " + title;
                                            patientObservation.patientId = $("#CRMpatietid").val();
                                            patientObservation.IssuedDate = recordeddate;
                                            var dataSet = patientObservation;
                                            var item = {};

                                            if (dataSet.hasOwnProperty('ObservationID')) {
                                                item.id = dataSet.ObservationID;
                                            }
                                            item.name = "Observation - " + title;

                                            if (dataSet.hasOwnProperty('IssuedDate')) {
                                                item.date = moment.utc(recordeddate).format('MM/DD/YYYY');
                                                item.dateTime = moment.utc(recordeddate).format('YYYY-MM-DD HH:mm:ss');
                                            }
                                            item.type = 1;
                                            item.id = obv[i].id;
                                            if (obv[i].hasOwnProperty("encounter")) {
                                                item.encounterID = obv[i].encounter.reference.split('/')[1];
                                            }
                                            item.entity = "Observation";
                                            list.push(item);
                                        }
                                    }
                                }
                            }
                        }

                    var enco = smart.patient.api.fetchAll({
                        type: 'Encounter',
                        query: {
                            patient: patient.id
                        }
                    });

                    $.when(enco).done(function (encounter) {
                            if (encounter != null) {
                                if (encounter.length > 0) {
                                    for (var i = 0; i <= encounter.length; i++) {
                                        if (encounter[i] != null && encounter[i].resourceType != "OperationOutcome") {
                                            if (encounter[i] != undefined) {
                                                if (encounter[i].hasOwnProperty('type')) {
                                                    var title = encounter[i].type[0].text;
                                                }
                                                var recordeddate = "";
                                                if (encounter[i].hasOwnProperty('period')) {
                                                    recordeddate = encounter[i].period.start;
                                                }
                                                else if (encounter[i].hasOwnProperty('meta')) {
                                                    recordeddate = encounter[i].meta.lastUpdated;
                                                }
                                                var patientEncounter = {}
                                                patientEncounter.encounterID = encounter[i].id;
                                                patientEncounter.Title = "Encounter - " + title;
                                                patientEncounter.RecordedDate = recordeddate;
                                                patientEncounter.PatientID = $("#CRMpatietid").val();
                                                var dataSet = patientEncounter;
                                                var item = {};

                                                item.name = dataSet.Title;

                                                if (dataSet.hasOwnProperty('RecordedDate')) {
                                                    item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                    item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                                }
                                                item.type = 2;
                                                item.id = dataSet.encounterID;
                                                item.entity = "Encounter";
                                                list.push(item);
                                            }
                                        }
                                    }
                                }
                            }
                    });

                    //CreatePatient(patient.id);

                    var alrgy = smart.patient.api.fetchAll({
                        type: 'AllergyIntolerance',
                        query: {
                            patient: patient.id,
                            'clinical-status': 'Active'
                        }
                    });

                    $.when(alrgy).done(function (Allergy) {
                            if (Allergy != null) {
                                if (Allergy.length > 0) {
                                    for (var i = 0; i <= Allergy.length; i++) {
                                        if (Allergy[i] != null && Allergy[i].resourceType != "OperationOutcome") {
                                            if (Allergy[i] != undefined) {
                                                //var title = Allergy[i].substance.text;
                                                var title = "";
                                                if (Allergy[i].hasOwnProperty('reaction')) {
                                                    title = Allergy[i].reaction[0].description;
                                                }
                                                var recordeddate = Allergy[i].recordedDate;
                                                var patientAllergy = {}
                                                patientAllergy.AllergyID = Allergy[i].id;
                                                patientAllergy.name = "Allergy - " + title;
                                                patientAllergy.patientId = $("#CRMpatietid").val();
                                                patientAllergy.RecordedDate = recordeddate;
                                                var dataSet = patientAllergy;
                                                var item = {};

                                                if (dataSet.hasOwnProperty('Id')) {
                                                    item.id = dataSet.Id;
                                                }
                                                item.name = dataSet.name;

                                                if (dataSet.hasOwnProperty('RecordedDate')) {
                                                    item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                    item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                                }
                                                item.type = 3;
                                                item.id = dataSet.AllergyID;
                                                if (Allergy[i].hasOwnProperty("encounter")) {
                                                    item.encounterID = Allergy[i].encounter.reference.split('/')[1];
                                                }
                                                item.entity = "Allergy Intolerance";
                                                list.push(item);
                                            }
                                        }
                                    }
                                }
                            }
                    });


                    //Observation.Search (LDA-W) (R4)
                    var observationObj = smart.patient.api.fetchAll({
                        type: 'Observation',
                        query: {
                            patient: patient.id,
                            'category': 'lda'
                        }
                    });

                    $.when(observationObj).done(function (Observation) {
                        if (Observation != null) {
                            if (Observation.length > 0) {
                                for (var i = 0; i <= Observation.length; i++) {
                                    if (Observation[i] != null && Observation[i].resourceType != "OperationOutcome") {
                                        if (Observation[i] != undefined) {
                                            var title = "";
                                            if (Observation[i].hasOwnProperty('reaction')) {
                                                title = Observation[i].reaction[0].description;
                                            }
                                            var recordeddate = Observation[i].recordedDate;
                                            var patientObservation = {}
                                            patientObservation.AllergyID = Observation[i].id;
                                            patientObservation.name = "Observation LDA-W - " + title;
                                            patientObservation.patientId = $("#CRMpatietid").val();
                                            patientObservation.RecordedDate = recordeddate;
                                            var dataSet = patientObservation;
                                            var item = {};

                                            if (dataSet.hasOwnProperty('Id')) {
                                                item.id = dataSet.Id;
                                            }
                                            item.name = dataSet.name;

                                            if (dataSet.hasOwnProperty('RecordedDate')) {
                                                item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                            }
                                            item.type = 3;
                                            item.id = dataSet.ObservationID;
                                            if (Observation[i].hasOwnProperty("encounter")) {
                                                item.encounterID = Observation[i].encounter.reference.split('/')[1];
                                            }
                                            item.entity = "Observation LDA-W";
                                            list.push(item);
                                        }
                                    }
                                }
                            }
                        }
                    });

                    //Observation.Search (Core Characteristics) (R4)
                    var observationObj = smart.patient.api.fetchAll({
                        type: 'Observation',
                        query: {
                            patient: patient.id,
                            'category': 'core-characteristics'
                        }
                    });

                    $.when(observationObj).done(function (Observation) {
                        if (Observation != null) {
                            if (Observation.length > 0) {
                                for (var i = 0; i <= Observation.length; i++) {
                                    if (Observation[i] != null && Observation[i].resourceType != "OperationOutcome") {
                                        if (Observation[i] != undefined) {
                                            var title = "";
                                            if (Observation[i].hasOwnProperty('reaction')) {
                                                title = Observation[i].reaction[0].description;
                                            }
                                            var recordeddate = Observation[i].recordedDate;
                                            var patientObservation = {}
                                            patientObservation.AllergyID = Observation[i].id;
                                            patientObservation.name = "Observation Core Characteristics- " + title;
                                            patientObservation.patientId = $("#CRMpatietid").val();
                                            patientObservation.RecordedDate = recordeddate;
                                            var dataSet = patientObservation;
                                            var item = {};

                                            if (dataSet.hasOwnProperty('Id')) {
                                                item.id = dataSet.Id;
                                            }
                                            item.name = dataSet.name;

                                            if (dataSet.hasOwnProperty('RecordedDate')) {
                                                item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                            }
                                            item.type = 3;
                                            item.id = dataSet.ObservationID;
                                            if (Observation[i].hasOwnProperty("encounter")) {
                                                item.encounterID = Observation[i].encounter.reference.split('/')[1];
                                            }
                                            item.entity = "Observation Core Characteristics";
                                            list.push(item);
                                        }
                                    }
                                }
                            }
                        }
                    });

                    //genomics
                    var cond = smart.patient.api.fetchAll({
                        type: 'Condition',
                        query: {
                            patient: patient.id,
                            'category': 'genomics'
                        }
                    });

                    $.when(cond).done(function (condition) {
                            if (condition != null) {
                                if (condition.length > 0) {
                                    for (var i = 0; i <= condition.length; i++) {
                                        if (condition[i] != null && condition[i].resourceType != "OperationOutcome") {
                                            if (condition[i] != undefined) {
                                                var title = "";
                                                if (condition[i].code.coding != undefined) {
                                                    title = condition[i].code.coding[0].display;
                                                }
                                                var recordeddate = condition[i].onsetDateTime;
                                                var patientCondition = {}
                                                patientCondition.conditionID = condition[i].id;
                                                patientCondition.Title = "Condition - " + title;
                                                patientCondition.RecordedDate = recordeddate;
                                                patientCondition.PatientID = $("#CRMpatietid").val();
                                                var dataSet = patientCondition;
                                                var item = {};
                                                if (dataSet.hasOwnProperty('ConditionID')) {
                                                    item.id = dataSet.ConditionID;
                                                }
                                                item.name = dataSet.Title;
                                                if (dataSet.hasOwnProperty('RecordedDate')) {
                                                    item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                    item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                                }
                                                item.type = 4;
                                                item.id = dataSet.conditionID;
                                                if (condition[i].hasOwnProperty("encounter")) {
                                                    item.encounterID = condition[i].encounter.reference.split('/')[1];
                                                }
                                                item.entity = "Condition";
                                                list.push(item);
                                            }
                                        }
                                    }
                                }
                            }
                    });

                    //Condition.Search (Health Concern) (R4)
                    var cond = smart.patient.api.fetchAll({
                        type: 'Condition',
                        query: {
                            patient: patient.id,
                            'category': 'health-concern'
                        }
                    });

                    $.when(cond).done(function (condition) {
                        if (condition != null) {
                            if (condition.length > 0) {
                                for (var i = 0; i <= condition.length; i++) {
                                    if (condition[i] != null && condition[i].resourceType != "OperationOutcome") {
                                        if (condition[i] != undefined) {
                                            var title = "";
                                            if (condition[i].code.coding != undefined) {
                                                title = condition[i].code.coding[0].display;
                                            }
                                            var recordeddate = condition[i].onsetDateTime;
                                            var patientCondition = {}
                                            patientCondition.conditionID = condition[i].id;
                                            patientCondition.Title = "Condition Health Concern - " + title;
                                            patientCondition.RecordedDate = recordeddate;
                                            patientCondition.PatientID = $("#CRMpatietid").val();
                                            var dataSet = patientCondition;
                                            var item = {};
                                            if (dataSet.hasOwnProperty('ConditionID')) {
                                                item.id = dataSet.ConditionID;
                                            }
                                            item.name = dataSet.Title;
                                            if (dataSet.hasOwnProperty('RecordedDate')) {
                                                item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                            }
                                            item.type = 4;
                                            item.id = dataSet.conditionID;
                                            if (condition[i].hasOwnProperty("encounter")) {
                                                item.encounterID = condition[i].encounter.reference.split('/')[1];
                                            }
                                            item.entity = "Condition Health Concern";
                                            list.push(item);
                                        }
                                    }
                                }
                            }
                        }
                    });

                    //Condition.Search (Problems) (R4)
                    var cond = smart.patient.api.fetchAll({
                        type: 'Condition',
                        query: {
                            patient: patient.id,
                            'category': 'problem-list-item'
                        }
                    });

                    $.when(cond).done(function (condition) {
                        if (condition != null) {
                            if (condition.length > 0) {
                                for (var i = 0; i <= condition.length; i++) {
                                    if (condition[i] != null && condition[i].resourceType != "OperationOutcome") {
                                        if (condition[i] != undefined) {
                                            var title = "";
                                            if (condition[i].code.coding != undefined) {
                                                title = condition[i].code.coding[0].display;
                                            }
                                            var recordeddate = condition[i].onsetDateTime;
                                            var patientCondition = {}
                                            patientCondition.conditionID = condition[i].id;
                                            patientCondition.Title = "Condition Problems - " + title;
                                            patientCondition.RecordedDate = recordeddate;
                                            patientCondition.PatientID = $("#CRMpatietid").val();
                                            var dataSet = patientCondition;
                                            var item = {};
                                            if (dataSet.hasOwnProperty('ConditionID')) {
                                                item.id = dataSet.ConditionID;
                                            }
                                            item.name = dataSet.Title;
                                            if (dataSet.hasOwnProperty('RecordedDate')) {
                                                item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                            }
                                            item.type = 4;
                                            item.id = dataSet.conditionID;
                                            if (condition[i].hasOwnProperty("encounter")) {
                                                item.encounterID = condition[i].encounter.reference.split('/')[1];
                                            }
                                            item.entity = "Condition Problems";
                                            list.push(item);
                                        }
                                    }
                                }
                            }
                        }
                    });

                    var Immunizate = smart.patient.api.fetchAll({
                        type: 'Immunization',
                        query: {
                            patient: patient.id
                        }
                    });

                    $.when(Immunizate).done(function (Immunization) {
                        if (Immunization != null) {
                            if (Immunization.length > 0) {
                                for (var i = 0; i <= Immunization.length; i++) {
                                    if (Immunization[i] != null && Immunization[i].resourceType != "OperationOutcome") {
                                        if (Immunization[i] != undefined) {
                                            var title = "";
                                            if (Immunization[i].medicationCodeableConcept != undefined) {
                                                title = Immunization[i].medicationCodeableConcept.coding[0].display;
                                            }
                                            var recordeddate = Immunization[i].dateWritten;
                                            var patientImmunization = {}
                                            patientImmunization.ImmunizationID = Immunization[i].id;
                                            patientImmunization.Title = "Immunization - " + title;
                                            patientImmunization.RecordedDate = recordeddate;
                                            patientImmunization.PatientID = $("#CRMpatietid").val();
                                            var dataSet = patientImmunization;
                                            var item = {};
                                            //if (dataSet.hasOwnProperty('MedicationOrderID')) {
                                            //    item.id = dataSet.MedicationOrderID;
                                            //}
                                            item.name = dataSet.Title;
                                            if (dataSet.hasOwnProperty('RecordedDate')) {
                                                item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                            }
                                            item.type = 5;
                                            item.id = dataSet.ImmunizationID;
                                            if (Immunization[i].hasOwnProperty("encounter")) {
                                                item.encounterID = Immunization[i].encounter.reference.split('/')[1];
                                            }
                                            item.entity = "Immunization";
                                            list.push(item);
                                        }
                                    }
                                }
                            }
                        }
                    });  

                    //ResearchStudy
                    var ResearchStudyObj = smart.patient.api.fetchAll({
                        type: 'ResearchStudy',
                        query: {
                            identifier:101,
                            //patient: patient.id
                        }
                    });

                    $.when(ResearchStudyObj).done(function (ResearchStudy) {
                        if (ResearchStudy != null) {
                            if (ResearchStudy.length > 0) {
                                for (var i = 0; i <= ResearchStudy.length; i++) {
                                    if (ResearchStudy[i] != null && ResearchStudy[i].resourceType != "OperationOutcome") {
                                        if (ResearchStudy[i] != undefined) {
                                            var title = "";
                                            if (ResearchStudy[i].medicationCodeableConcept != undefined) {
                                                title = ResearchStudy[i].medicationCodeableConcept.coding[0].display;
                                            }
                                            var recordeddate = ResearchStudy[i].dateWritten;
                                            var patientResearchStudy = {}
                                            patientResearchStudy.ResearchStudyID = ResearchStudy[i].id;
                                            patientResearchStudy.Title = "ResearchStudy - " + title;
                                            patientResearchStudy.RecordedDate = recordeddate;
                                            patientResearchStudy.PatientID = $("#CRMpatietid").val();
                                            var dataSet = patientResearchStudy;
                                            var item = {};
                                            item.name = dataSet.Title;
                                            if (dataSet.hasOwnProperty('RecordedDate')) {
                                                item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                            }
                                            item.type = 6;
                                            item.id = dataSet.ResearchStudyID;
                                            if (ResearchStudy[i].hasOwnProperty("encounter")) {
                                                item.encounterID = ResearchStudy[i].encounter.reference.split('/')[1];
                                            }
                                            item.entity = "ResearchStudy";
                                            list.push(item);
                                        }
                                    }
                                }
                            }
                        }
                    });  

                    //ExplanationOfBenefit
                    function location() {
                    //var ExplanationOfBenefitObj = smart.patient.api.fetchAll({
                    //    type: 'ExplanationOfBenefit',
                    //    query: {
                    //        patient: patient.id
                    //    }
                    //});

                    //$.when(ExplanationOfBenefitObj).done(function (ExplanationOfBenefit) {
                    //    if (ExplanationOfBenefit != null) {
                    //        if (ExplanationOfBenefit.length > 0) {
                    //            for (var i = 0; i <= ExplanationOfBenefit.length; i++) {
                    //                if (ExplanationOfBenefit[i] != null && ExplanationOfBenefit[i].resourceType != "OperationOutcome") {
                    //                    if (ExplanationOfBenefit[i] != undefined) {
                    //                        var title = "";
                    //                        if (ExplanationOfBenefit[i].medicationCodeableConcept != undefined) {
                    //                            title = ExplanationOfBenefit[i].medicationCodeableConcept.coding[0].display;
                    //                        }
                    //                        var recordeddate = ExplanationOfBenefit[i].dateWritten;
                    //                        var patientExplanationOfBenefit = {}
                    //                        patientExplanationOfBenefit.ExplanationOfBenefitID = ExplanationOfBenefit[i].id;
                    //                        patientExplanationOfBenefit.Title = "ResearchStudy - " + title;
                    //                        patientExplanationOfBenefit.RecordedDate = recordeddate;
                    //                        patientExplanationOfBenefit.PatientID = $("#CRMpatietid").val();
                    //                        var dataSet = patientExplanationOfBenefit;
                    //                        var item = {};
                    //                        item.name = dataSet.Title;
                    //                        if (dataSet.hasOwnProperty('RecordedDate')) {
                    //                            item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                    //                            item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                    //                        }
                    //                        item.type = 7;
                    //                        item.id = dataSet.ExplanationOfBenefitID;
                    //                        if (ExplanationOfBenefit[i].hasOwnProperty("encounter")) {
                    //                            item.encounterID = ExplanationOfBenefit[i].encounter.reference.split('/')[1];
                    //                        }
                    //                        item.entity = "ExplanationOfBenefit";
                    //                        list.push(item);
                    //                    }
                    //                }
                    //            }
                    //        }
                    //    }
                    //});  
                    }

                    //Consent
                    var ConsentObj = smart.patient.api.fetchAll({
                        type: 'Consent',
                        query: {
                            patient: patient.id,
                            'status': 'active',
                            category: 'http://loinc.org|59284-0'
                        }
                    });

                    $.when(ConsentObj).done(function (Consent) {
                        if (Consent != null) {
                            if (Consent.length > 0) {
                                for (var i = 0; i <= Consent.length; i++) {
                                    if (Consent[i] != null && Consent[i].resourceType != "OperationOutcome") {
                                        if (Consent[i] != undefined) {
                                            var title = "";
                                            if (Consent[i].medicationCodeableConcept != undefined) {
                                                title = Consent[i].medicationCodeableConcept.coding[0].display;
                                            }
                                            var recordeddate = Consent[i].dateWritten;
                                            var patientConsent = {}
                                            patientConsent.ConsentID = Consent[i].id;
                                            patientConsent.Title = "Consent - " + title;
                                            patientConsent.RecordedDate = recordeddate;
                                            patientConsent.PatientID = $("#CRMpatietid").val();
                                            var dataSet = patientConsent;
                                            var item = {};
                                            item.name = dataSet.Title;
                                            if (dataSet.hasOwnProperty('RecordedDate')) {
                                                item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                            }
                                            item.type = 8;
                                            item.id = dataSet.ConsentID;
                                            if (ExplanationOfBenefit[i].hasOwnProperty("encounter")) {
                                                item.encounterID = Consent[i].encounter.reference.split('/')[1];
                                            }
                                            item.entity = "Consent";
                                            list.push(item);
                                        }
                                    }
                                }
                            }
                        }
                    }); 

                    //AdverseEvent
                    function AdverseEvent() {
                    //var AdverseEventObj = smart.patient.api.fetchAll({
                    //    type: 'AdverseEvent',
                    //    query: {
                    //        subject: 'eea8Msv-9WjX-ffbBcv-4rw3',
                    //        study: 'eAO.XWJpIicOp3xl5CLneUQ3'
                    //    }
                    //});

                    //$.when(AdverseEventObj).done(function (AdverseEvent) {
                    //    if (AdverseEvent != null) {
                    //        if (AdverseEvent.length > 0) {
                    //            for (var i = 0; i <= AdverseEvent.length; i++) {
                    //                if (AdverseEvent[i] != null && AdverseEvent[i].resourceType != "OperationOutcome") {
                    //                    if (AdverseEvent[i] != undefined) {
                    //                        var title = "";
                    //                        if (AdverseEvent[i].medicationCodeableConcept != undefined) {
                    //                            title = AdverseEvent[i].medicationCodeableConcept.coding[0].display;
                    //                        }
                    //                        var recordeddate = AdverseEvent[i].dateWritten;
                    //                        var patientAdverseEvent = {}
                    //                        patientAdverseEvent.AdverseEventID = AdverseEvent[i].id;
                    //                        patientAdverseEvent.Title = "AdverseEvent - " + title;
                    //                        patientAdverseEvent.RecordedDate = recordeddate;
                    //                        patientAdverseEvent.PatientID = $("#CRMpatietid").val();
                    //                        var dataSet = patientAdverseEvent;
                    //                        var item = {};
                    //                        item.name = dataSet.Title;
                    //                        if (dataSet.hasOwnProperty('RecordedDate')) {
                    //                            item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                    //                            item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                    //                        }
                    //                        item.type = 9;
                    //                        item.id = dataSet.AdverseEventID;
                    //                        if (patientAdverseEvent[i].hasOwnProperty("encounter")) {
                    //                            item.encounterID = patientAdverseEvent[i].encounter.reference.split('/')[1];
                    //                        }
                    //                        item.entity = "patientAdverseEvent";
                    //                        list.push(item);
                    //                    }
                    //                }
                    //            }
                    //        }
                    //    }
                    //}); 
                    }

                    if (fname == "" || lname == "") {
                        fname = "abc"
                        lname = "xyz"
                    }

                    var PractitionerObj = smart.patient.api.fetchAll({
                        type: 'Practitioner',
                        query: {
                            patient: patient.id,
                            given: fname,
                            family: lname
                        }
                    });

                    $.when(PractitionerObj).done(function (Practitioner) {
                        if (Practitioner != null) {
                            if (Practitioner.length > 0) {
                                for (var i = 0; i <= Practitioner.length; i++) {
                                    if (Practitioner[i] != null && Practitioner[i].resourceType != "OperationOutcome") {
                                        if (Practitioner[i] != undefined) {
                                            var title = "";
                                            if (Practitioner[i].medicationCodeableConcept != undefined) {
                                                title = Practitioner[i].medicationCodeableConcept.coding[0].display;
                                            }
                                            var recordeddate = Practitioner[i].dateWritten;
                                            var patientPractitioner = {}
                                            patientPractitioner.PractitionerID = Practitioner[i].id;
                                            patientPractitioner.Title = "Practitioner - " + title;
                                            patientPractitioner.RecordedDate = recordeddate;
                                            patientPractitioner.PatientID = $("#CRMpatietid").val();
                                            var dataSet = patientPractitioner;
                                            var item = {};
                                            //if (dataSet.hasOwnProperty('MedicationOrderID')) {
                                            //    item.id = dataSet.MedicationOrderID;
                                            //}
                                            item.name = dataSet.Title;
                                            if (dataSet.hasOwnProperty('RecordedDate')) {
                                                item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                            }
                                            item.type = 10;
                                            item.id = dataSet.PractitionerID;
                                            if (Immunization[i].hasOwnProperty("encounter")) {
                                                item.encounterID = Immunization[i].encounter.reference.split('/')[1];
                                            }
                                            item.entity = "Practitioner";
                                            list.push(item);
                                        }
                                    }
                                }
                            }
                        }
                    }); 

                    var DiagnosticReportObj = smart.patient.api.fetchAll({
                        type: 'DiagnosticReport',
                        query: {
                            patient: patient.id
                        }
                    });

                    $.when(DiagnosticReportObj).done(function (DiagnosticReport) {
                        if (DiagnosticReport != null) {
                            if (DiagnosticReport.length > 0) {
                                for (var i = 0; i <= DiagnosticReport.length; i++) {
                                    if (DiagnosticReport[i] != null && DiagnosticReport[i].resourceType != "OperationOutcome") {
                                        if (DiagnosticReport[i] != undefined) {
                                            var title = "";
                                            if (DiagnosticReport[i].medicationCodeableConcept != undefined) {
                                                title = DiagnosticReport[i].medicationCodeableConcept.coding[0].display;
                                            }
                                            var recordeddate = DiagnosticReport[i].dateWritten;
                                            var patientDiagnosticReport = {}
                                            patientDiagnosticReport.DiagnosticReportID = DiagnosticReport[i].id;
                                            patientDiagnosticReport.Title = "DiagnosticReport - " + title;
                                            patientDiagnosticReport.RecordedDate = recordeddate;
                                            patientDiagnosticReport.PatientID = $("#CRMpatietid").val();
                                            var dataSet = patientDiagnosticReport;
                                            var item = {};
                                            //if (dataSet.hasOwnProperty('MedicationOrderID')) {
                                            //    item.id = dataSet.MedicationOrderID;
                                            //}
                                            item.name = dataSet.Title;
                                            if (dataSet.hasOwnProperty('RecordedDate')) {
                                                item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                            }
                                            item.type = 11;
                                            item.id = dataSet.DiagnosticReportID;
                                            if (DiagnosticReport[i].hasOwnProperty("encounter")) {
                                                item.encounterID = DiagnosticReport[i].encounter.reference.split('/')[1];
                                            }
                                            item.entity = "DiagnosticReport";
                                            list.push(item);
                                        }
                                    }
                                }
                            }
                        }
                    }); 

                    var MedicationRequestObj = smart.patient.api.fetchAll({
                        type: 'MedicationRequest',
                        query: {
                            patient: patient.id
                        }
                    });

                    $.when(MedicationRequestObj).done(function (MedicationRequest) {
                        if (MedicationRequest != null) {
                            if (MedicationRequest.length > 0) {
                                for (var i = 0; i <= MedicationRequest.length; i++) {
                                    if (MedicationRequest[i] != null && MedicationRequest[i].resourceType != "OperationOutcome") {
                                        if (MedicationRequest[i] != undefined) {
                                            var title = "";
                                            if (MedicationRequest[i].medicationCodeableConcept != undefined) {
                                                title = MedicationRequest[i].medicationCodeableConcept.coding[0].display;
                                            }
                                            var recordeddate = MedicationRequest[i].dateWritten;
                                            var MedicationRequestReport = {}
                                            MedicationRequestReport.MedicationRequestID = MedicationRequest[i].id;
                                            MedicationRequestReport.Title = "MedicationRequest - " + title;
                                            MedicationRequestReport.RecordedDate = recordeddate;
                                            MedicationRequestReport.PatientID = $("#CRMpatietid").val();
                                            var dataSet = MedicationRequestReport;
                                            var item = {};
                                            //if (dataSet.hasOwnProperty('MedicationOrderID')) {
                                            //    item.id = dataSet.MedicationOrderID;
                                            //}
                                            item.name = dataSet.Title;
                                            if (dataSet.hasOwnProperty('RecordedDate')) {
                                                item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                            }
                                            item.type = 12;
                                            item.id = dataSet.MedicationRequestID;
                                            if (MedicationRequest[i].hasOwnProperty("encounter")) {
                                                item.encounterID = MedicationRequest[i].encounter.reference.split('/')[1];
                                            }
                                            item.entity = "MedicationRequest";
                                            list.push(item);
                                        }
                                    }
                                }
                            }
                        }
                    }); 


                    var ServiceRequestObj = smart.patient.api.fetchAll({
                        type: 'ServiceRequest',
                        query: {
                            patient: patient.id
                        }
                    });

                    $.when(ServiceRequestObj).done(function (ServiceRequest) {
                        if (ServiceRequest != null) {
                            if (ServiceRequest.length > 0) {
                                for (var i = 0; i <= ServiceRequest.length; i++) {
                                    if (ServiceRequest[i] != null && ServiceRequest[i].resourceType != "OperationOutcome") {
                                        if (ServiceRequest[i] != undefined) {
                                            var title = "";
                                            if (ServiceRequest[i].medicationCodeableConcept != undefined) {
                                                title = ServiceRequest[i].medicationCodeableConcept.coding[0].display;
                                            }
                                            var recordeddate = ServiceRequest[i].dateWritten;
                                            var ServiceRequestReport = {}
                                            ServiceRequestReport.ServiceRequestID = ServiceRequest[i].id;
                                            ServiceRequestReport.Title = "ServiceRequest - " + title;
                                            ServiceRequestReport.RecordedDate = recordeddate;
                                            ServiceRequestReport.PatientID = $("#CRMpatietid").val();
                                            var dataSet = ServiceRequestReport;
                                            var item = {};
                                            //if (dataSet.hasOwnProperty('MedicationOrderID')) {
                                            //    item.id = dataSet.MedicationOrderID;
                                            //}
                                            item.name = dataSet.Title;
                                            if (dataSet.hasOwnProperty('RecordedDate')) {
                                                item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                            }
                                            item.type = 13;
                                            item.id = dataSet.ServiceRequestID;
                                            if (ServiceRequest[i].hasOwnProperty("encounter")) {
                                                item.encounterID = ServiceRequest[i].encounter.reference.split('/')[1];
                                            }
                                            item.entity = "ServiceRequest";
                                            list.push(item);
                                        }
                                    }
                                }
                            }
                        }
                    }); 


                    var PractitionerRoleObj = smart.patient.api.fetchAll({
                        type: 'PractitionerRole',
                        query: {
                            practitioner: PractitionerID
                        }
                    });

                    $.when(PractitionerRoleObj).done(function (PractitionerRole) {
                        if (PractitionerRole != null) {
                            if (PractitionerRole.length > 0) {
                                for (var i = 0; i <= PractitionerRole.length; i++) {
                                    if (PractitionerRole[i] != null && PractitionerRole[i].resourceType != "OperationOutcome") {
                                        if (PractitionerRole[i] != undefined) {
                                            var title = "";
                                            if (PractitionerRole[i].medicationCodeableConcept != undefined) {
                                                title = PractitionerRole[i].medicationCodeableConcept.coding[0].display;
                                            }
                                            var recordeddate = PractitionerRole[i].dateWritten;
                                            var PractitionerRoleReport = {}
                                            PractitionerRoleReport.PractitionerRoleID = PractitionerRole[i].id;
                                            PractitionerRoleReport.Title = "PractitionerRole - " + title;
                                            PractitionerRoleReport.RecordedDate = recordeddate;
                                            PractitionerRoleReport.PatientID = $("#CRMpatietid").val();
                                            var dataSet = PractitionerRoleReport;
                                            var item = {};
                                            //if (dataSet.hasOwnProperty('MedicationOrderID')) {
                                            //    item.id = dataSet.MedicationOrderID;
                                            //}
                                            item.name = dataSet.Title;
                                            if (dataSet.hasOwnProperty('RecordedDate')) {
                                                item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                            }
                                            item.type = 14;
                                            item.id = dataSet.PractitionerRoleID;
                                            if (PractitionerRole[i].hasOwnProperty("encounter")) {
                                                item.encounterID = PractitionerRole[i].encounter.reference.split('/')[1];
                                            }
                                            item.entity = "PractitionerRole";
                                            list.push(item);
                                        }
                                    }
                                }
                            }
                        }
                    }); 

                    var CoverageObj = smart.patient.api.fetchAll({
                        type: 'Coverage',
                        query: {
                            patient: patient.id
                        }
                    });

                    $.when(CoverageObj).done(function (Coverage) {
                        if (Coverage != null) {
                            if (Coverage.length > 0) {
                                for (var i = 0; i <= Coverage.length; i++) {
                                    if (Coverage[i] != null && Coverage[i].resourceType != "OperationOutcome") {
                                        if (Coverage[i] != undefined) {
                                            var title = "";
                                            if (Coverage[i].medicationCodeableConcept != undefined) {
                                                title = Coverage[i].medicationCodeableConcept.coding[0].display;
                                            }
                                            var recordeddate = Coverage[i].dateWritten;
                                            var CoverageReport = {}
                                            CoverageReport.CoverageID = Coverage[i].id;
                                            CoverageReport.Title = "Coverage - " + title;
                                            CoverageReport.RecordedDate = recordeddate;
                                            CoverageReport.PatientID = $("#CRMpatietid").val();
                                            var dataSet = CoverageReport;
                                            var item = {};
                                            //if (dataSet.hasOwnProperty('MedicationOrderID')) {
                                            //    item.id = dataSet.MedicationOrderID;
                                            //}
                                            item.name = dataSet.Title;
                                            if (dataSet.hasOwnProperty('RecordedDate')) {
                                                item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                            }
                                            item.type = 15;
                                            item.id = dataSet.CoverageID;
                                            if (Coverage[i].hasOwnProperty("encounter")) {
                                                item.encounterID = Coverage[i].encounter.reference.split('/')[1];
                                            }
                                            item.entity = "Coverage";
                                            list.push(item);
                                        }
                                    }
                                }
                            }
                        }
                    }); 


                    var proc = smart.patient.api.fetchAll({
                        type: 'Procedure',
                        query: {
                            patient: patient.id
                        }
                    });

                    $.when(proc).done(function (procedure) {
                            if (procedure != null) {
                                if (procedure.length > 0) {
                                    for (var i = 0; i <= procedure.length; i++) {
                                        if (procedure[i] != null && procedure[i].resourceType != "OperationOutcome") {
                                            if (procedure[i] != undefined) {
                                                var title = procedure[i].code.coding[0].display;
                                                var recordeddate = '';

                                                if (procedure[i].hasOwnProperty("performedDateTime")) {
                                                    recordeddate = procedure[i].performedDateTime;
                                                }
                                                else if (procedure[i].hasOwnProperty("performedPeriod")) {
                                                    recordeddate = procedure[i].performedPeriod.start;
                                                }
                                                else if (procedure[i].hasOwnProperty("meta")) {
                                                    if (procedure[i].meta.lastUpdated != "undefined") {
                                                        recordeddate = procedure[i].meta.lastUpdated;
                                                    }
                                                }
                                                if (recordeddate.length == 4) {
                                                    if (procedure[i].meta.lastUpdated != "undefined") {
                                                        recordeddate = procedure[i].meta.lastUpdated;
                                                    }
                                                }

                                                //CreateProcedure(procedure[i].id, $("#CRMpatietid").val(), "Procedure - " + title, recordeddate);
                                                var patientProcedure = {}
                                                patientProcedure.procedureID = procedure[i].id;
                                                patientProcedure.Title = "Procedure - " + title;
                                                patientProcedure.RecordedDate = recordeddate;
                                                patientProcedure.PatientID = $("#CRMpatietid").val();
                                                //patientProcedureGlobal = patientProcedure;
                                                var dataSet = patientProcedure;
                                                var item = {};

                                                //if (dataSet.hasOwnProperty('ProcedureID')) {
                                                //    item.id = dataSet.ProcedureID;
                                                //}
                                                item.name = dataSet.Title;

                                                if (dataSet.hasOwnProperty('RecordedDate')) {
                                                    item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                    item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                                }
                                                item.type = 16;
                                                item.id = dataSet.procedureID;
                                                if (procedure[i].hasOwnProperty("encounter")) {
                                                    item.encounterID = procedure[i].encounter.reference.split('/')[1];
                                                }
                                                item.entity = "Procedure";
                                                list.push(item);
                                            }
                                        }
                                    }
                                }
                            }
                    });

                    var devi = smart.patient.api.fetchAll({
                        type: 'Device',
                        query: {
                            patient: patient.id
                        }
                    });

                    $.when(devi).done(function (device) {
                        if (device != null) {
                            if (device.length > 0) {
                                for (var i = 0; i <= device.length; i++) {
                                    if (device[i] != null && device[i].resourceType != "OperationOutcome") {
                                        if (device[i] != undefined) {
                                            var title = device[i].type.text;
                                            var recordeddate = device[i].meta.lastUpdated;
                                            //CreateDevice(device[i].id, $("#CRMpatietid").val(), "Device - " + title, recordeddate);
                                            var patientDevice = {}
                                            patientDevice.deviceID = device[i].id;
                                            patientDevice.Title = "Device - " + title;
                                            patientDevice.RecordedDate = recordeddate;
                                            patientDevice.PatientID = $("#CRMpatietid").val();
                                            //patientDeviceGlobal = patientDevice;
                                            var dataSet = patientDevice;
                                            var item = {};

                                            if (dataSet.hasOwnProperty('DeviceID')) {
                                                item.id = dataSet.DeviceID;
                                            }
                                            item.name = dataSet.Title;

                                            if (dataSet.hasOwnProperty('RecordedDate')) {
                                                item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                            }
                                            item.type = 17;
                                            item.id = dataSet.deviceID;
                                            if (device[i].hasOwnProperty("encounter")) {
                                                item.encounterID = device[i].encounter.reference.split('/')[1];
                                            }
                                            item.entity = "Device";
                                            list.push(item);
                                        }
                                    }
                                }
                            }
                        }
                    });

                    var CareTeamObj = smart.patient.api.fetchAll({
                        type: 'CareTeam',
                        query: {
                            patient: patient.id
                        }
                    });

                    $.when(CareTeamObj).done(function (CareTeam) {
                        if (CareTeam != null) {
                            if (CareTeam.length > 0) {
                                for (var i = 0; i <= CareTeam.length; i++) {
                                    if (CareTeam[i] != null && CareTeam[i].resourceType != "OperationOutcome") {
                                        if (CareTeam[i] != undefined) {
                                            var title = CareTeam[i].type.text;
                                            var recordeddate = CareTeam[i].meta.lastUpdated;
                                                //CreateDevice(device[i].id, $("#CRMpatietid").val(), "Device - " + title, recordeddate);
                                            var CareTeamDevice = {}
                                            CareTeamDevice.deviceID = CareTeam[i].id;
                                            CareTeamDevice.Title = "CareTeam - " + title;
                                            CareTeamDevice.RecordedDate = recordeddate;
                                            CareTeamDevice.PatientID = $("#CRMpatietid").val();
                                                //patientDeviceGlobal = patientDevice;
                                                var dataSet = patientDevice;
                                                var item = {};

                                                if (dataSet.hasOwnProperty('DeviceID')) {
                                                    item.id = dataSet.DeviceID;
                                                }
                                                item.name = dataSet.Title;

                                                if (dataSet.hasOwnProperty('RecordedDate')) {
                                                    item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                    item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                                }
                                                item.type = 18;
                                                item.id = dataSet.deviceID;
                                                if (device[i].hasOwnProperty("encounter")) {
                                                    item.encounterID = device[i].encounter.reference.split('/')[1];
                                                }
                                            item.entity = "CareTeam";
                                                list.push(item);
                                            }
                                        }
                                    }
                                }
                            }
                    });


                    var DocumentReferenceObj = smart.patient.api.fetchAll({
                        type: 'DocumentReference',
                        query: {
                            patient: patient.id
                        }
                    });

                    $.when(DocumentReferenceObj).done(function (DocumentReference) {
                        if (DocumentReference != null) {
                            if (DocumentReference.length > 0) {
                                for (var i = 0; i <= DocumentReference.length; i++) {
                                    if (DocumentReference[i] != null && DocumentReference[i].resourceType != "OperationOutcome") {
                                        if (DocumentReference[i] != undefined) {
                                            var title = DocumentReference[i].type.text;
                                            var recordeddate = DocumentReference[i].date;
                                            //DocumentReference[0].date
                                            //DocumentReference[i].meta.lastUpdated
                                            //CreateDevice(device[i].id, $("#CRMpatietid").val(), "Device - " + title, recordeddate);
                                            var DocumentReferencePatient = {}
                                            DocumentReferencePatient.deviceID = DocumentReference[i].id;
                                            DocumentReferencePatient.Title = "DocumentReference - " + title;
                                            DocumentReferencePatient.RecordedDate = recordeddate;
                                            DocumentReferencePatient.PatientID = $("#CRMpatietid").val();
                                            //patientDeviceGlobal = patientDevice;
                                            var dataSet = DocumentReferencePatient;
                                            var item = {};

                                            if (dataSet.hasOwnProperty('DeviceID')) {
                                                item.id = dataSet.DeviceID;
                                            }
                                            item.name = dataSet.Title;

                                            if (dataSet.hasOwnProperty('RecordedDate')) {
                                                item.date = moment.utc(dataSet.RecordedDate).format('MM/DD/YYYY');
                                                item.dateTime = moment.utc(dataSet.RecordedDate).format('YYYY-MM-DD HH:mm:ss');
                                            }
                                            item.type = 19;
                                            item.id = dataSet.deviceID;
                                            if (DocumentReference[i].hasOwnProperty("encounter")) {
                                                item.encounterID = DocumentReference[i].encounter.reference.split('/')[1];
                                            }
                                            item.entity = "DocumentReference";
                                            list.push(item);
                                        }
                                    }
                                }
                            }
                        }
                    });

                    //Longitudinal 38717003
                    //Encounter 734163000
                    var cp = smart.patient.api.fetchAll({
                        type: 'CarePlan',
                        query: {
                            patient: patient.id,
                            'category': '734163000'
                        }
                    });

                    $.when(cp).done(function (careplan) {
                            if (careplan != null) {
                                if (careplan.length > 0) {
                                    for (var i = 0; i <= 10; i++) {
                                        if (careplan[i] != null && careplan[i].resourceType != "OperationOutcome") {
                                            if (careplan[i] != undefined) {
                                                //CreateCarePlan(careplan[i].id, $("#CRMpatietid").val(), fname + " " + lname + " Care Plan", fname + " " + lname + " Care Plan", careplan[i].period.start, careplan[i].period.start);
                                                //id, patientid, title, desc, startdate, enddate
                                                var patientCarePlan = {}
                                                patientCarePlan.careplanID = careplan[i].id;
                                                patientCarePlan.Title = fname + " " + lname + " Care Plan";
                                                patientCarePlan.Description = fname + " " + lname + " Care Plan";
                                                //patientCarePlan.STartDate = careplan[i].period.start;
                                                //patientCarePlan.EndDate = careplan[i].period.start;
                                                var d = new Date();
                                                patientCarePlan.STartDate = d;
                                                patientCarePlan.EndDate = d;
                                                patientCarePlan.PatientID = $("#CRMpatietid").val();
                                                //patientCarePlanGlobal = patientCarePlan;
                                                var dataSet = patientCarePlan;
                                                var item = {};
                                                if (dataSet.hasOwnProperty('CarePlanID')) {
                                                    item.id = dataSet.CarePlanID;
                                                }
                                                item.name = dataSet.Title;
                                                if (dataSet.hasOwnProperty('STartDate')) {
                                                    item.date = moment.utc(dataSet.STartDate).format('MM/DD/YYYY');
                                                    item.dateTime = moment.utc(dataSet.STartDate).format('YYYY-MM-DD HH:mm:ss');
                                                }
                                                item.type = 20;
                                                item.id = dataSet.careplanID;
                                                if (careplan[i].hasOwnProperty("encounter")) {
                                                    item.encounterID = careplan[i].encounter.reference.split('/')[1];
                                                }
                                                item.entity = "Care Plan";
                                                list.push(item);
                                            }
                                        }
                                    }
                                }
                            }
                    });

                    var goal = smart.patient.api.fetchAll({
                        type: 'Goal',
                        query: {
                            patient: patient.id
                        }
                    });

                    $.when(goal).done(function (Goal) {
                            if (Goal != null) {
                                if (Goal.length > 0) {
                                    for (var i = 0; i <= Goal.length; i++) {
                                        if (Goal[i] != null && Goal[i].resourceType != "OperationOutcome") {
                                            if (Goal[i] != undefined) {

                                                var externalEmrId = Goal[i].id;
                                                var startdate = Goal[i].startDate;
                                                var targetdate = Goal[i].targetDate;
                                                var category = Goal[i].category[0].text;
                                                var description = Goal[i].description;
                                                //CreateGoal(externalEmrId, $("#CRMpatietid").val(), startdate, targetdate, category, description);
                                                var Goal = {}
                                                Goal.Externalemrid = externalEmrId;
                                                Goal.Patientid = $("#CRMpatietid").val();
                                                Goal.Startdate = startdate;
                                                Goal.TargetDate = targetdate;
                                                Goal.Category = category;
                                                Goal.Description = description;
                                                //patientGoalGlobal = Goal;
                                                var dataSet = Goal;
                                                var item = {};

                                                if (dataSet.hasOwnProperty('GoalId')) {
                                                    item.id = dataSet.GoalId;
                                                }
                                                item.name = dataSet.Category;

                                                if (dataSet.hasOwnProperty('Startdate')) {
                                                    item.date = moment.utc(dataSet.Startdate).format('MM/DD/YYYY');
                                                    item.dateTime = moment.utc(dataSet.Startdate).format('YYYY-MM-DD HH:mm:ss');
                                                }
                                                if (Goal[i].hasOwnProperty("encounter")) {
                                                    item.encounterID = Goal[i].encounter.reference.split('/')[1];
                                                }
                                                item.type = 21;
                                                item.entity = "Goal";
                                                list.push(item);
                                            }
                                        }
                                    }
                                }
                            }
                    });

                    function Binary() {
                    /* Binary
                //var BinaryObj = smart.patient.api.fetchAll({
                //    type: 'Binary/e1Aa5.W2M8iS873-A9H.S8w3'
                //    //,
                //    //query: {
                //    //    //patient: patient.id
                //    //    id: 'e1Aa5.W2M8iS873-A9H.S8w3'
                //    //}
                //});

                //$.when(BinaryObj).done(function (Binary) {
                //    if (Binary != null) {
                //        if (Binary.length > 0) {
                //            for (var i = 0; i <= Binary.length; i++) {
                //                if (Binary[i] != null && Binary[i].resourceType != "OperationOutcome") {
                //                    if (Binary[i] != undefined) {

                //                        var externalEmrId = Binary[i].id;
                //                        var startdate = Binary[i].startDate;
                //                        var targetdate = Binary[i].targetDate;
                //                        var category = Binary[i].category[0].text;
                //                        var description = Binary[i].description;
                //                        var BinaryPatient = {}
                //                        BinaryPatient.Externalemrid = externalEmrId;
                //                        BinaryPatient.Patientid = $("#CRMpatietid").val();
                //                        BinaryPatient.Startdate = startdate;
                //                        BinaryPatient.TargetDate = targetdate;
                //                        BinaryPatient.Category = category;
                //                        BinaryPatient.Description = description;
                //                        var dataSet = BinaryPatient;
                //                        var item = {};

                //                        if (dataSet.hasOwnProperty('BinaryId')) {
                //                            item.id = dataSet.BinaryId;
                //                        }
                //                        item.name = dataSet.Category;

                //                        if (dataSet.hasOwnProperty('Startdate')) {
                //                            item.date = moment.utc(dataSet.Startdate).format('MM/DD/YYYY');
                //                            item.dateTime = moment.utc(dataSet.Startdate).format('YYYY-MM-DD HH:mm:ss');
                //                        }
                //                        if (Binary[i].hasOwnProperty("encounter")) {
                //                            item.encounterID = Binary[i].encounter.reference.split('/')[1];
                //                        }
                //                        item.type = 22;
                //                        item.entity = "Binary";
                //                        list.push(item);
                //                    }
                //                }
                //            }
                //        }
                //    }
                //});
                 */
                    }
                 
                    var ReviewCollectionObj = smart.patient.api.fetchAll({
                        type: 'ReviewCollection/' + patient.id
                        //,
                        //query: {
                        //    patient: patient.id
                        //}
                    });

                    $.when(ReviewCollectionObj).done(function (ReviewCollection) {
                        if (ReviewCollection != null) {
                            if (ReviewCollection.length > 0) {
                                for (var i = 0; i <= ReviewCollection.length; i++) {
                                    if (ReviewCollection[i] != null && ReviewCollection[i].resourceType != "OperationOutcome") {
                                        if (ReviewCollection[i] != undefined) {

                                            var externalEmrId = ReviewCollection[i].id;
                                            var startdate = ReviewCollection[i].startDate;
                                            var targetdate = ReviewCollection[i].targetDate;
                                            var category = ReviewCollection[i].category[0].text;
                                            var description = ReviewCollection[i].description;
                                            var ReviewCollectionPatient = {}
                                            ReviewCollectionPatient.Externalemrid = externalEmrId;
                                            ReviewCollectionPatient.Patientid = $("#CRMpatietid").val();
                                            ReviewCollectionPatient.Startdate = startdate;
                                            ReviewCollectionPatient.TargetDate = targetdate;
                                            ReviewCollectionPatient.Category = category;
                                            ReviewCollectionPatient.Description = description;
                                            var dataSet = ReviewCollectionPatient;
                                            var item = {};

                                            if (dataSet.hasOwnProperty('ReviewCollectionId')) {
                                                item.id = dataSet.GoalId;
                                            }
                                            item.name = dataSet.Category;

                                            if (dataSet.hasOwnProperty('Startdate')) {
                                                item.date = moment.utc(dataSet.Startdate).format('MM/DD/YYYY');
                                                item.dateTime = moment.utc(dataSet.Startdate).format('YYYY-MM-DD HH:mm:ss');
                                            }
                                            if (ReviewCollection[i].hasOwnProperty("encounter")) {
                                                item.encounterID = ReviewCollection[i].encounter.reference.split('/')[1];
                                            }
                                            item.type = 23;
                                            item.entity = "ReviewCollection";
                                            list.push(item);
                                        }
                                    }
                                }
                            }
                        }
                    });

                    //RelatedPerson
                    var RelatedPersonObj = smart.patient.api.fetchAll({
                        type: 'RelatedPerson/' + patient.id
                        //,
                        //query: {
                        //    patient: patient.id
                        //}
                    });

                    $.when(RelatedPersonObj).done(function (RelatedPerson) {
                        if (RelatedPerson != null) {
                            if (RelatedPerson.length > 0) {
                                for (var i = 0; i <= RelatedPerson.length; i++) {
                                    if (RelatedPerson[i] != null && RelatedPerson[i].resourceType != "OperationOutcome") {
                                        if (RelatedPerson[i] != undefined) {

                                            var externalEmrId = RelatedPerson[i].id;
                                            var startdate = RelatedPerson[i].startDate;
                                            var targetdate = RelatedPerson[i].targetDate;
                                            var category = RelatedPerson[i].category[0].text;
                                            var description = RelatedPerson[i].description;
                                            var RelatedPersonPatient = {}
                                            RelatedPersonPatient.Externalemrid = externalEmrId;
                                            RelatedPersonPatient.Patientid = $("#CRMpatietid").val();
                                            RelatedPersonPatient.Startdate = startdate;
                                            RelatedPersonPatient.TargetDate = targetdate;
                                            RelatedPersonPatient.Category = category;
                                            RelatedPersonPatient.Description = description;
                                            var dataSet = RelatedPersonPatient;
                                            var item = {};

                                            if (dataSet.hasOwnProperty('RelatedPersonId')) {
                                                item.id = dataSet.RelatedPersonId;
                                            }
                                            item.name = dataSet.Category;

                                            if (dataSet.hasOwnProperty('Startdate')) {
                                                item.date = moment.utc(dataSet.Startdate).format('MM/DD/YYYY');
                                                item.dateTime = moment.utc(dataSet.Startdate).format('YYYY-MM-DD HH:mm:ss');
                                            }
                                            if (RelatedPerson[i].hasOwnProperty("encounter")) {
                                                item.encounterID = RelatedPerson[i].encounter.reference.split('/')[1];
                                            }
                                            item.type = 24;
                                            item.entity = "RelatedPerson";
                                            list.push(item);
                                        }
                                    }
                                }
                            }
                        }
                    });

                    // TODO encounter.search give you location fhir id
                    // location fhir id issue
                    function location() {
                    //eM5CWtq15N0WJeuCet5bJlQ3 prac
                    //enRyWnSP963FYDpoks4NHOA3 mo
                    //var LocationObj = smart.patient.api.fetchAll({
                    //    type: 'Location/eM5CWtq15N0WJeuCet5bJlQ3'
                    //    //,
                    //    //query: {
                    //    //    _id: 'eMRHhr1Ry-G-RV0fqAju6kA3'
                    //    //}
                    //});

                    //$.when(Location).done(function (Location) {
                    //    if (Location != null) {
                    //        if (Location.length > 0) {
                    //            for (var i = 0; i <= Location.length; i++) {
                    //                if (Location[i] != null && Location[i].resourceType != "OperationOutcome") {
                    //                    if (Location[i] != undefined) {

                    //                        var externalEmrId = Location[i].id;
                    //                        var startdate = Location[i].startDate;
                    //                        var targetdate = Location[i].targetDate;
                    //                        var category = Location[i].category[0].text;
                    //                        var description = Location[i].description;
                    //                        var LocationPatient = {}
                    //                        LocationPatient.Externalemrid = externalEmrId;
                    //                        LocationPatient.Patientid = $("#CRMpatietid").val();
                    //                        LocationPatient.Startdate = startdate;
                    //                        LocationPatient.TargetDate = targetdate;
                    //                        LocationPatient.Category = category;
                    //                        LocationPatient.Description = description;
                    //                        var dataSet = LocationPatient;
                    //                        var item = {};

                    //                        if (dataSet.hasOwnProperty('RelatedPersonId')) {
                    //                            item.id = dataSet.RelatedPersonId;
                    //                        }
                    //                        item.name = dataSet.Category;

                    //                        if (dataSet.hasOwnProperty('Startdate')) {
                    //                            item.date = moment.utc(dataSet.Startdate).format('MM/DD/YYYY');
                    //                            item.dateTime = moment.utc(dataSet.Startdate).format('YYYY-MM-DD HH:mm:ss');
                    //                        }
                    //                        if (Location[i].hasOwnProperty("encounter")) {
                    //                            item.encounterID = Location[i].encounter.reference.split('/')[1];
                    //                        }
                    //                        item.type = 25;
                    //                        item.entity = "Location";
                    //                        list.push(item);
                    //                    }
                    //                }
                    //            }
                    //        }
                    //    }
                    //});
                    }

                    //Organization
                    var OrganizationObj = smart.patient.api.fetchAll({
                        type: 'Organization' + '/eeNokRCBmmrYFeeVdV8l5fO9o5IYP-YzoXHEV2zjGzXM3'
                        //,
                        //query: {
                        //    patient: patient.id
                        //}
                    });

                    $.when(OrganizationObj).done(function (Organization) {
                        if (Organization != null) {
                            if (Organization.length > 0) {
                                for (var i = 0; i <= Organization.length; i++) {
                                    if (Organization[i] != null && Organization[i].resourceType != "OperationOutcome") {
                                        if (Organization[i] != undefined) {

                                            var externalEmrId = Organization[i].id;
                                            var startdate = Organization[i].startDate;
                                            var targetdate = Organization[i].targetDate;
                                            var category = Organization[i].category[0].text;
                                            var description = Organization[i].description;
                                            var OrganizationPatient = {}
                                            OrganizationPatient.Externalemrid = externalEmrId;
                                            OrganizationPatient.Patientid = $("#CRMpatietid").val();
                                            OrganizationPatient.Startdate = startdate;
                                            OrganizationPatient.TargetDate = targetdate;
                                            OrganizationPatient.Category = category;
                                            OrganizationPatient.Description = description;
                                            var dataSet = OrganizationPatient;
                                            var item = {};

                                            if (dataSet.hasOwnProperty('OrganizationId')) {
                                                item.id = dataSet.OrganizationId;
                                            }
                                            item.name = dataSet.Category;

                                            if (dataSet.hasOwnProperty('Startdate')) {
                                                item.date = moment.utc(dataSet.Startdate).format('MM/DD/YYYY');
                                                item.dateTime = moment.utc(dataSet.Startdate).format('YYYY-MM-DD HH:mm:ss');
                                            }
                                            if (Organization[i].hasOwnProperty("encounter")) {
                                                item.encounterID = Organization[i].encounter.reference.split('/')[1];
                                            }
                                            item.type = 26;
                                            item.entity = "Organization";
                                            list.push(item);
                                        }
                                    }
                                }
                            }
                        }
                    });


                    setTimeout(function () {
                        $("#timeline").show();
                        timeline();
                    }, 2000);  //7000     

                    setTimeout(function () {
                        $("#timeline").hide();
                        //timeline();
                    }, 7000);

                    setTimeout(function () {
                        $("#timeline").show();
                        timeline();
                    }, 7010);

                });

            } else {
                onError();
            }
        }

        FHIR.oauth2.ready(onReady, onError);
        return ret.promise();

    };

    function defaultPatient() {
        return {
            fname: { value: '' },
            lname: { value: '' },
            phone: { value: '' },
            email: { value: '' },
            gender: { value: '' },
            birthdate: { value: '' },
            height: { value: '' },
            systolicbp: { value: '' },
            diastolicbp: { value: '' },
            ldl: { value: '' },
            hdl: { value: '' },
        };
    }

    function getBloodPressureValue(BPObservations, typeOfPressure) {
        var formattedBPObservations = [];
        BPObservations.forEach(function (observation) {
            var BP = observation.component.find(function (component) {
                return component.code.coding.find(function (coding) {
                    return coding.code == typeOfPressure;
                });
            });
            if (BP) {
                observation.valueQuantity = BP.valueQuantity;
                formattedBPObservations.push(observation);
            }
        });

        return getQuantityValueAndUnit(formattedBPObservations[0]);
    }

    function getQuantityValueAndUnit(ob) {
        if (typeof ob != 'undefined' &&
            typeof ob.valueQuantity != 'undefined' &&
            typeof ob.valueQuantity.value != 'undefined' &&
            typeof ob.valueQuantity.unit != 'undefined') {
            return ob.valueQuantity.value + ' ' + ob.valueQuantity.unit;
        } else {
            return undefined;
        }
    }

    window.drawVisualization = function (p) {
        $('#holder').show();
        $('#loading').hide();
        $(".loader").hide();
        $('#fname').html(p.fname);
        $('#lname').html(p.lname);
        $('#phone').html(p.phone);
        if (p.email == "") {
            $('#email').html("testing@testing_email.com");
        }
        else {
            $('#email').html(p.email);
        }
        $('#gender').html(p.gender);
        $('#birthdate').html(p.birthdate);
        $('#height').html(p.height);
        $('#systolicbp').html(p.systolicbp);
        $('#diastolicbp').html(p.diastolicbp);
        $('#ldl').html(p.ldl);
        $('#hdl').html(p.hdl);
    };

    function timeline() {
        var YearList = [];
        var currentStartDate;
        var currentEndDate = moment(new Date()).format('MM/DD/YYYY');
        var checkedEvents = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26'];
        var checkedYears = [];
        var pid = $("#CRMpatietid").val();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        if (pid == '' || pid == null) {
            $('.timelinecontrolnew').hide();
            $('.errorMessage').show();
        } else {
            $('.errorMessage').hide();
            $('.timelinecontrolnew').show();
            //getPatientRegistrationDate();
            loadData(true);
        }

        // EVENTS

        $(".chkEvent").on("click", function () {
            var ev = $(".chkEventItem");

            if (this.value == 0) //select all
            {
                for (var index = 0; index < ev.length; index++) {
                    ev[index].checked = this.checked;
                }
            }

            checkedEvents = [];
            for (var index = 0; index < ev.length; index++) {
                if (ev[index].checked)
                    checkedEvents.push(ev[index].value);
            }

            if (!checkedEvents.includes('2') && checkedEvents.length >= 1) {
                checkedEvents.push('2');
                ev[1].checked = true;
            }

            var eventSelect = document.getElementById("eventSelect");
            var arrow = eventSelect.innerText.slice(-1);
            if (checkedEvents.length == 0)
                eventSelect.innerText = "Events " + arrow;
            else
                if (checkedEvents.length == ev.length)
                    eventSelect.innerText = "All Events " + arrow;
                else
                    eventSelect.innerText = checkedEvents.length + " out of " + ev.length + " events " + arrow

            LoadTimeline();
        });

        // FUNCTIONS

        function loadData(doSync) {
            //$("._loader").show();
            //$(".loader").show();
            setTimeout(function () {
                if (doSync) {
                    //loadUserDateFormat();
                    //list = [];
                    //if (checkedEvents.indexOf('5') > -1) {
                    //    Device();
                    //}
                    //if (checkedEvents.indexOf('6') > -1) {
                    //    Encounter();
                    //}                
                }

                //event = $('select').val() == null ? '' : $('select').val();
                //var fltrData = list.filter(function (e) { return this.indexOf(e.type.toString()) > -1; }, checkedEvents);
                list.sort(dateSort);
                for (var i = 0; i < list.length; i++) {
                    var date = new Date(list[i].date)
                    YearList.push(date.getFullYear());
                }

                //TODO undo this commented code
                var YearListNew = (YearList) => YearList.filter((v, i) => YearList.indexOf(v) === i)
                YearList = YearListNew(YearList);
                checkedYears = YearList;

                loadYearDropdown(YearList);


                $(".note img").click(function () {
                    var $control = $(this).next('p');
                    if ($control.is(":not(:visible)")) {
                        $control.removeClass('addTranslate');
                        $control.addClass('removeTranslate');
                        setTimeout(function () {
                            $control.show();
                        }, 10);//300
                    } else {
                        $control.addClass('addTranslate');
                        $control.removeClass('removeTranslate');
                        setTimeout(function () {
                            $control.hide();
                        }, 10);//300
                    }
                });

                $(".openLink").click(function () {
                    var id = $(this).data("id");
                    var entity = $(this).data("entity");
                    openForm(id, entity);
                });

                //$("._loader").hide();
                //$(".loader").show();

            }, 500); //500
        }

        function loadYearDropdown(array) {
            $("#yearEventList").html("");
            $("#yearEventList").append('<div><input class="chkYear" type = "checkbox" value = "0" name = "years" checked = "">[All Years]</div>')
            for (var i = 0; i < array.length; i++) {
                $("#yearEventList").append('<div><input class="chkYear chkYearItem" type = "checkbox" value = "' + array[i] + '" name = "years" checked = "">' + array[i] + '</div>')
            }

            $(".chkYear").on("click", function () {
                var ev = $(".chkYearItem");

                if (this.value == 0) //select all
                {
                    for (var index = 0; index < ev.length; index++) {
                        ev[index].checked = this.checked;
                    }
                }

                checkedYears = [];
                for (var index = 0; index < ev.length; index++) {
                    if (ev[index].checked)
                        checkedYears.push(ev[index].value);
                }

                var eventSelect = document.getElementById("yearSelect");
                var arrow = eventSelect.innerText.slice(-1);
                if (checkedYears.length == 0)
                    eventSelect.innerText = "Years " + arrow;
                else
                    if (checkedYears.length == ev.length)
                        eventSelect.innerText = "All Years " + arrow;
                    else
                        eventSelect.innerText = checkedYears.length + " out of " + ev.length + " events " + arrow

                 LoadTimeline();
            });


            LoadTimeline();
        }

        function LoadTimeline() {
            //$("#loading").show();
            //$(".loader").show();
            $("#timelinecontrolnew").hide()
            $("#timeline").html("");
            var value = $('#changeOrder').val();
            var breaker = false;
            var counter = 0;
            var loopBreakingValue = 100;

            var filterdata = list.filter(function (e) { return this.indexOf(e.type.toString()) > -1; }, checkedEvents);

            var html = "";

            if (value == "true") {
                var newArray = filterdata.sort((a, b) => (a.type == 6) ? -1 : 1); // for encounter ascending
                for (var j = 0; j < checkedYears.length; j++) {
                    //if (breaker == true) {
                    //    break;
                    //}
                    counter = 0;
                    var item = checkedYears[j];
                    html = '<div class="timeline__group" id="' + item + '"><span class="timeline__year" >' + item + '</span></div>';
                    //console.log(html);
                    $("#timeline").append(html);
                    for (var i = 0; i < newArray.length; i++) {
                        //console.log("j_i: " + j+'_'+i);
                        //if (i == loopBreakingValue) {
                        //    breaker = true;
                        //    break;
                        //}
                        //if (filterdata[i].entity == "Encounter") {
                        //    continue;
                        //}
                        var date = new Date(newArray[i].date)
                        var id = newArray[i].id;
                        var name = newArray[i].name;
                        var type = newArray[i].type;
                        var entity = newArray[i].entity;
                        var year = date.getFullYear();
                        var month = monthNames[date.getMonth()];
                        var day = date.getDate();
                        var encounterID = newArray[i].encounterID;
                        var collapseHTML = '';
                        if (entity == "Encounter") {
                            collapseHTML = ' <i style="left:90px;margin-left: 10px" class="arrow right"></i>';
                        }
                        //console.log("year: " + year);
                        //console.log("item: " + item);
                        //console.log("id: " + id);
                        //console.log("encounterID: " + encounterID);
                        //console.log("entity: " + entity);
                        //console.log("counter: " + ++counter);
                        var spanClass = "";
                        var imgClass = "";

                        GetEntityImageData(entity)

                        spanClass = objData.spanClass;
                        imgClass = objData.imgClass;
                        imageName = objData.imageName;

                        //console.log("entity:year:item " + entity + ' - ' + year + ' - ' + item);
                        //console.log("id " + id);
                        //console.log("===============================================");
                        if (year == item) {
                            //if (entity == "MedicationOrder") {
                            //    console.log("===============================================");
                            //    console.log("entity: " + entity);
                            //    console.log("encounterID: " + encounterID);
                            //    console.log("id: " + id);
                            //console.log("=========== "+id+" ==========");
                            //}
                            var yeardivcount = $("#" + year).length;
                            var idEncounter = '#' + encounterID;
                            if (yeardivcount > 0) {
                                var thistimelineboxcount = $("#" + year).find(".timeline__box").length;
                                if (thistimelineboxcount > 0) {
                                    var daydivcount = $("#" + year).find(".timeline__box").find("." + day).length;
                                    var daydivmonth = $("#" + year).find(".timeline__box").find("." + month).length;
                                    if (daydivcount > 0 && daydivmonth > 0) {
                                        if (encounterID != undefined && entity != "Encounter") {
                                            if ($(idEncounter).parent().parent().parent().siblings().children().length >= 1) {
                                                html = '<div class="timeline__post">' +
                                                    '<div class="timeline__content"> ' +
                                                    '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + '</span>' +
                                                    '<p> ' + name + '</p>' +
                                                    '<span class="mzkicon ' + spanClass + '">' +
                                                    '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                                    '</span>' +
                                                    '</div></div>';
                                                $(idEncounter).parent().parent().parent().siblings().append(html);
                                                html = "";
                                            }
                                            else {
                                                html = '<div class="timeline__box mzkheight mzktimelinebox">' +
                                                    '<div class="timeline__post">' +
                                                    '<div class="timeline__content"> ' +
                                                    '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + '</span>' +
                                                    '<p> ' + name + '</p>' +
                                                    '<span class="mzkicon ' + spanClass + '">' +
                                                    '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                                    '</span>' +
                                                    '</div></div></div>';
                                                $(idEncounter).parent().parent().parent().parent().append(html);
                                                html = "";
                                            }
                                        }
                                        else {
                                            html = '<div class="accordion"><div class="timeline__box mzkheight mzktimelinebox">' +
                                                '<div class="timeline__post">' +
                                                '<div class="timeline__content"> ' +
                                                '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + collapseHTML + '</span>' +
                                                '<p> ' + name + '</p>' +
                                                '<span class="mzkicon ' + spanClass + '">' +
                                                '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                                '</span>' +
                                                '</div></div></div></div>';
                                        }
                                    }
                                    else {
                                        if (encounterID != undefined && entity != "Encounter") {
                                            if ($(idEncounter).parent().parent().parent().siblings().children().length >= 1) {
                                                html = '<div class="timeline__box mzkheight mzktimelinebox"><div class="timeline__date mzkpanalchild">' +
                                                    '<span class="timeline__day ' + day + '">' + day + '</span>' +
                                                    '<span class="timeline__month ' + month + '">' + month + '</span></div>' +
                                                    '<div class="timeline__post">' +
                                                    '<div class="timeline__content"> ' +
                                                    '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + '</span>' +
                                                    '<p> ' + name + '</p>' +
                                                    '<span class="mzkicon ' + spanClass + '">' +
                                                    '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                                    '</span>' +
                                                    '</div></div></div>';
                                                $(idEncounter).parent().parent().parent().siblings().append(html);
                                                html = "";
                                            }
                                            else {
                                                html = '<div class="timeline__box mzkheight mzktimelinebox">' +
                                                    // TODO testing
                                                    //'<span class="timeline__day ' + day + '">' + day + '</span>' +
                                                    //'<span class="timeline__month ' + month + '">' + month + '</span></div>' +
                                                    '<div class="timeline__post">' +
                                                    '<div class="timeline__content"> ' +
                                                    '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + '</span>' +
                                                    '<p> ' + name + '</p>' +
                                                    '<span class="mzkicon ' + spanClass + '">' +
                                                    '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                                    '</span>' +
                                                    '</div></div></div>';
                                                $(idEncounter).parent().parent().parent().parent().append(html);
                                                html = "";
                                            }
                                        }
                                        else {
                                            html = '<div class="accordion"><div class="timeline__box mzkheight mzktimelinebox"><div class="timeline__date">' +
                                                '<span class="timeline__day ' + day + '">' + day + '</span>' +
                                                '<span class="timeline__month ' + month + '">' + month + '</span></div>' +
                                                '<div class="timeline__post">' +
                                                '<div class="timeline__content"> ' +
                                                '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + collapseHTML + '</span>' +
                                                '<p> ' + name + '</p>' +
                                                '<span class="mzkicon ' + spanClass + '">' +
                                                '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                                '</span>' +
                                                '</div></div></div></div>';
                                        }
                                    }
                                }
                                else {
                                    if (encounterID != undefined && entity != "Encounter") {
                                        if ($(idEncounter).parent().parent().parent().siblings().children().length >= 1) {
                                            html = '<div class="timeline__box mzkheight mzktimelinebox"><div class="timeline__date mzkpanalchild">' +
                                                '<span class="timeline__day ' + day + '">' + day + '</span>' +
                                                '<span class="timeline__month ' + month + '">' + month + '</span></div>' +
                                                '<div class="timeline__post">' +
                                                '<div class="timeline__content"> ' +
                                                '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + '</span>' +
                                                '<p> ' + name + '</p>' +
                                                '<span class="mzkicon ' + spanClass + '">' +
                                                '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                                '</span>' +
                                                '</div></div></div>';
                                            $(idEncounter).parent().parent().parent().siblings().append(html);
                                            html = "";
                                        }
                                        else {
                                            html = '<div class="timeline__box mzkheight mzktimelinebox"><div class="timeline__date mzkpanalchild">' +
                                                '<span class="timeline__day ' + day + '">' + day + '</span>' +
                                                '<span class="timeline__month ' + month + '">' + month + '</span></div>' +
                                                '<div class="timeline__post">' +
                                                '<div class="timeline__content"> ' +
                                                '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + '</span>' +
                                                '<p> ' + name + '</p>' +
                                                '<span class="mzkicon ' + spanClass + '">' +
                                                '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                                '</span>' +
                                                '</div></div></div>';
                                            $(idEncounter).parent().parent().parent().parent().append(html);
                                            html = "";
                                        }
                                    }
                                    else {
                                        html = '<div class="accordion"><div class="timeline__box mzkheight mzktimelinebox"><div class="timeline__date">' +
                                            '<span class="timeline__day ' + day + '">' + day + '</span>' +
                                            '<span class="timeline__month ' + month + '">' + month + '</span></div>' +
                                            '<div class="timeline__post">' +
                                            '<div class="timeline__content"> ' +
                                            '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + collapseHTML + '</span>' +
                                            '<p> ' + name + '</p>' +
                                            '<span class="mzkicon ' + spanClass + '">' +
                                            '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                            '</span>' +
                                            '</div></div></div></div>';
                                    }
                                }
                            }
                            else {
                                if (encounterID != undefined && entity != "Encounter") {
                                    if ($(idEncounter).parent().parent().parent().siblings().children().length >= 1) {
                                        html = '<div class="timeline__box mzkheight mzktimelinebox"><div class="timeline__date mzkpanalchild">' +
                                            '<span class="timeline__day ' + day + '">' + day + '</span>' +
                                            '<span class="timeline__month ' + month + '">' + month + '</span></div>' +
                                            '<div class="timeline__post">' +
                                            '<div class="timeline__content"> ' +
                                            '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + '</span>' +
                                            '<p> ' + name + '</p>' +
                                            '<span class="mzkicon ' + spanClass + '">' +
                                            '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                            '</span>' +
                                            '</div></div></div>';
                                        $(idEncounter).parent().parent().parent().siblings().append(html);
                                        html = "";
                                    }
                                    else {
                                        html = '<div class="timeline__box mzkheight mzktimelinebox"><div class="timeline__date mzkpanalchild">' +
                                            '<span class="timeline__day ' + day + '">' + day + '</span>' +
                                            '<span class="timeline__month ' + month + '">' + month + '</span></div>' +
                                            '<div class="timeline__post">' +
                                            '<div class="timeline__content"> ' +
                                            '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + '</span>' +
                                            '<p> ' + name + '</p>' +
                                            '<span class="mzkicon ' + spanClass + '">' +
                                            '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                            '</span>' +
                                            '</div></div></div>';
                                        $(idEncounter).parent().parent().parent().parent().append(html);
                                        html = "";
                                    }
                                }
                                else {
                                    html = '<div class="accordion"><div class="timeline__box mzkheight mzktimelinebox"><div class="timeline__date">' +
                                        '<span class="timeline__day ' + day + '">' + day + '</span>' +
                                        '<span class="timeline__month ' + month + '">' + month + '</span></div>' +
                                        '<div class="timeline__post">' +
                                        '<div class="timeline__content"> ' +
                                        '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + collapseHTML + '</span>' +
                                        '<p> ' + name + '</p>' +
                                        '<span class="mzkicon ' + spanClass + '">' +
                                        '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                        '</span>' +
                                        '</div></div></div></div>';
                                }
                            }
                        }
                        //console.log(html);
                        $("#" + year).append(html);
                        html = "";
                    }
                }
            }
            else {
                // for desending
                for (var j = checkedYears.length - 1; j >= 0; j--) {
                    //if (breaker == true) {
                    //    break;
                    //}
                    var item = checkedYears[j];
                    html = '<div class="timeline__group" id="' + item + '"><span class="timeline__year" >' + item + '</span></div>';
                    $("#timeline").append(html);
                    filterdata.sort((a, b) => (a.type == 6) ? 1 : -1) // for encounter descending
                    for (var i = filterdata.length - 1; i >= 0; i--) {
                        //console.log("j_i: " + j + '_' + i);
                        //if (i == loopBreakingValue) {
                        //    breaker = true;
                        //    break;
                        //}
                        var date = new Date(filterdata[i].date)
                        var id = filterdata[i].id;
                        var name = filterdata[i].name;
                        var type = filterdata[i].type;
                        var entity = filterdata[i].entity;
                        var year = date.getFullYear();
                        var month = monthNames[date.getMonth()];
                        var day = date.getDate();
                        var encounterID = filterdata[i].encounterID;
                        var collapseHTML = '';
                        if (entity == "Encounter") {
                            collapseHTML = ' <i style="left:90px;margin-left: 10px" class="arrow right"></i>';
                        }

                        var spanClass = "";
                        var imgClass = "";

                        GetEntityImageData(entity);

                        spanClass = objData.spanClass;
                        imgClass = objData.imgClass;
                        imageName = objData.imageName;

                        //switch (entity) {
                        //    case "Allergy Intolerance":
                        //        imageName = "allergy.png";
                        //        spanClass = "mzkaleryspan";
                        //        imgClass = 'mzkalergyimg';
                        //        break;
                        //    case "MedicationRequest":
                        //        imageName = "allergy.png";
                        //        spanClass = "mzkaleryspan";
                        //        imgClass = 'mzkalergyimg';
                        //        break;
                        //    case "ServiceRequest":
                        //        imageName = "allergy.png";
                        //        spanClass = "mzkaleryspan";
                        //        imgClass = 'mzkalergyimg';
                        //        break;
                        //    case "Coverage":
                        //        imageName = "allergy.png";
                        //        spanClass = "mzkaleryspan";
                        //        imgClass = 'mzkalergyimg';
                        //        break;
                        //    //Coverage
                        //    case "PractitionerRole":
                        //        imageName = "allergy.png";
                        //        spanClass = "mzkaleryspan";
                        //        imgClass = 'mzkalergyimg';
                        //        break;
                        //    case "DiagnosticReport":
                        //        imageName = "allergy.png";
                        //        spanClass = "mzkaleryspan";
                        //        imgClass = 'mzkalergyimg';
                        //        break;
                        //    case "Immunization":
                        //        imageName = "allergy.png";
                        //        spanClass = "mzkaleryspan";
                        //        imgClass = 'mzkalergyimg';
                        //        break;
                        //    case "DocumentReference":
                        //        imageName = "allergy.png";
                        //        spanClass = "mzkaleryspan";
                        //        imgClass = 'mzkalergyimg';
                        //        break;
                        //    case "Care Plan":
                        //        imageName = "allergy.png";
                        //        spanClass = "mzkaleryspan";
                        //        imgClass = 'mzkalergyimg';
                        //        break;
                        //    case "Observation":
                        //        imageName = "Observation.png";
                        //        spanClass = "mzkobserspan";
                        //        imgClass = 'mzkobserimg';
                        //        break;
                        //    case "Condition":
                        //        imageName = "conditon.png";
                        //        spanClass = "mzkobserspan";
                        //        imgClass = 'mzkobserimg';
                        //        break;
                        //    case "MedicationOrder":
                        //        imageName = "MedicationOrder.png";
                        //        spanClass = "mzkmedicationspan";
                        //        imgClass = 'mzkmedicationimg';
                        //        break;
                        //    case "Procedure":
                        //        imageName = "procedure.png";
                        //        spanClass = "mzkprocedurerspan";
                        //        imgClass = 'mzkprocedureimg';
                        //        break;
                        //    case "ProcedureRequest":
                        //        imageName = "request.png";
                        //        spanClass = "mzkprocreqspan";
                        //        imgClass = 'mzkprocreqimg';
                        //        break;
                        //    case "Encounter":
                        //        imageName = "encounter.png";
                        //        spanClass = "mzkencounterspan";
                        //        imgClass = 'mzkencounterimg';
                        //        break;
                        //    //case "Device":
                        //    //    imageName = "Device";
                        //    //    spanClass = ".mzkobserspan";
                        //    //    imgClass = '.mzkobserimg';
                        //    //    break;
                        //    //case "Care Plan":
                        //    //    imageName = "Care Plan";
                        //    //    spanClass = ".mzkobserspan";
                        //    //    imgClass = '.mzkobserimg';
                        //    //    break;
                        //    //case "Goal":
                        //    //    imageName = "Goal";
                        //    //    spanClass = ".mzkobserspan";
                        //    //    imgClass = '.mzkobserimg';
                        //    //    break;
                        //    default:
                        //        imageName = "";
                        //}
                        //console.log("entity:year:item " + entity + ' - ' + year + ' - ' + item);
                        //console.log("id: " + id);
                        //console.log("===============================================");
                        if (year == item) {
                            //if (entity == "MedicationOrder") {
                            //    console.log("===============================================");
                            //    console.log("entity: " + entity);
                            //    console.log("encounterID: " + encounterID);
                            //    console.log("id: " + id);
                            //console.log("=========== " + id + " ==========");
                            //}
                            var yeardivcount = $("#" + year).length;
                            var idEncounter = '#' + encounterID;
                            if (yeardivcount > 0) {
                                var thistimelineboxcount = $("#" + year).find(".timeline__box").length;
                                if (thistimelineboxcount > 0) {
                                    var daydivcount = $("#" + year).find(".timeline__box").find("." + day).length;
                                    var daydivmonth = $("#" + year).find(".timeline__box").find("." + month).length;
                                    if (daydivcount > 0 && daydivmonth > 0) {
                                        if (encounterID != undefined && entity != "Encounter") {
                                            if ($(idEncounter).parent().parent().parent().siblings().children().length >= 1) {
                                                html = '<div class="timeline__post">' +
                                                    '<div class="timeline__content"> ' +
                                                    '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + '</span>' +
                                                    '<p> ' + name + '</p>' +
                                                    '<span class="mzkicon ' + spanClass + '">' +
                                                    '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                                    '</span>' +
                                                    '</div></div>';
                                                $(idEncounter).parent().parent().parent().siblings().append(html);
                                                html = "";
                                            }
                                            else {
                                                html = '<div class="timeline__box mzkheight mzktimelinebox">' +
                                                    '<div class="timeline__post">' +
                                                    '<div class="timeline__content"> ' +
                                                    '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + '</span>' +
                                                    '<p> ' + name + '</p>' +
                                                    '<span class="mzkicon ' + spanClass + '">' +
                                                    '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                                    '</span>' +
                                                    '</div></div></div>';
                                                $(idEncounter).parent().parent().parent().parent().append(html);
                                                html = "";
                                            }
                                        }
                                        else {
                                            html = '<div class="accordion"><div class="timeline__box mzkheight mzktimelinebox">' +
                                                '<div class="timeline__post">' +
                                                '<div class="timeline__content"> ' +
                                                '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + collapseHTML + '</span>' +
                                                '<p> ' + name + '</p>' +
                                                '<span class="mzkicon ' + spanClass + '">' +
                                                '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                                '</span>' +
                                                '</div></div></div></div>';
                                        }
                                    }
                                    else {
                                        if (encounterID != undefined && entity != "Encounter") {
                                            if ($(idEncounter).parent().parent().parent().siblings().children().length >= 1) {
                                                html = '<div class="timeline__box mzkheight mzktimelinebox"><div class="timeline__date mzkpanalchild">' +
                                                    '<span class="timeline__day ' + day + '">' + day + '</span>' +
                                                    '<span class="timeline__month ' + month + '">' + month + '</span></div>' +
                                                    '<div class="timeline__post">' +
                                                    '<div class="timeline__content"> ' +
                                                    '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + '</span>' +
                                                    '<p> ' + name + '</p>' +
                                                    '<span class="mzkicon ' + spanClass + '">' +
                                                    '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                                    '</span>' +
                                                    '</div></div></div>';
                                                $(idEncounter).parent().parent().parent().siblings().append(html);
                                                html = "";
                                            }
                                            else {
                                                html = '<div class="timeline__box mzkheight mzktimelinebox">' +
                                                    // testing comment TODO
                                                    //'<span class="timeline__day ' + day + '">' + day + '</span>' +
                                                    //'<span class="timeline__month ' + month + '">' + month + '</span></div>' +
                                                    '<div class="timeline__post">' +
                                                    '<div class="timeline__content"> ' +
                                                    '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + '</span>' +
                                                    '<p> ' + name + '</p>' +
                                                    '<span class="mzkicon ' + spanClass + '">' +
                                                    '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                                    '</span>' +
                                                    '</div></div></div>';
                                                $(idEncounter).parent().parent().parent().parent().append(html);
                                                html = "";
                                            }
                                        }
                                        else {
                                            html = '<div class="accordion"><div class="timeline__box mzkheight mzktimelinebox"><div class="timeline__date">' +
                                                '<span class="timeline__day ' + day + '">' + day + '</span>' +
                                                '<span class="timeline__month ' + month + '">' + month + '</span></div>' +
                                                '<div class="timeline__post">' +
                                                '<div class="timeline__content"> ' +
                                                '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + collapseHTML + '</span>' +
                                                '<p> ' + name + '</p>' +
                                                '<span class="mzkicon ' + spanClass + '">' +
                                                '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                                '</span>' +
                                                '</div></div></div></div>';
                                        }
                                    }
                                }
                                else {
                                    if (encounterID != undefined && entity != "Encounter") {
                                        if ($(idEncounter).parent().parent().parent().siblings().children().length >= 1) {
                                            html = '<div class="timeline__box mzkheight mzktimelinebox"><div class="timeline__date mzkpanalchild">' +
                                                '<span class="timeline__day ' + day + '">' + day + '</span>' +
                                                '<span class="timeline__month ' + month + '">' + month + '</span></div>' +
                                                '<div class="timeline__post">' +
                                                '<div class="timeline__content"> ' +
                                                '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + '</span>' +
                                                '<p> ' + name + '</p>' +
                                                '<span class="mzkicon ' + spanClass + '">' +
                                                '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                                '</span>' +
                                                '</div></div></div>';
                                            $(idEncounter).parent().parent().parent().siblings().append(html);
                                            html = "";
                                        }
                                        else {
                                            html = '<div class="timeline__box mzkheight mzktimelinebox"><div class="timeline__date mzkpanalchild">' +
                                                '<span class="timeline__day ' + day + '">' + day + '</span>' +
                                                '<span class="timeline__month ' + month + '">' + month + '</span></div>' +
                                                '<div class="timeline__post">' +
                                                '<div class="timeline__content"> ' +
                                                '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + '</span>' +
                                                '<p> ' + name + '</p>' +
                                                '<span class="mzkicon ' + spanClass + '">' +
                                                '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                                '</span>' +
                                                '</div></div></div>';
                                            $(idEncounter).parent().parent().parent().parent().append(html);
                                            html = "";
                                        }
                                    }
                                    else {
                                        html = '<div class="accordion"><div class="timeline__box mzkheight mzktimelinebox"><div class="timeline__date">' +
                                            '<span class="timeline__day ' + day + '">' + day + '</span>' +
                                            '<span class="timeline__month ' + month + '">' + month + '</span></div>' +
                                            '<div class="timeline__post">' +
                                            '<div class="timeline__content"> ' +
                                            '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + collapseHTML + '</span>' +
                                            '<p> ' + name + '</p>' +
                                            '<span class="mzkicon ' + spanClass + '">' +
                                            '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                            '</span>' +
                                            '</div></div></div></div>';
                                    }
                                }
                            }
                            else {
                                if (encounterID != undefined && entity != "Encounter") {
                                    if ($(idEncounter).parent().parent().parent().siblings().children().length >= 1) {
                                        html = '<div class="timeline__box mzkheight mzktimelinebox"><div class="timeline__date mzkpanalchild">' +
                                            '<span class="timeline__day ' + day + '">' + day + '</span>' +
                                            '<span class="timeline__month ' + month + '">' + month + '</span></div>' +
                                            '<div class="timeline__post">' +
                                            '<div class="timeline__content"> ' +
                                            '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + '</span>' +
                                            '<p> ' + name + '</p>' +
                                            '<span class="mzkicon ' + spanClass + '">' +
                                            '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                            '</span>' +
                                            '</div></div></div>';
                                        $(idEncounter).parent().parent().parent().siblings().append(html);
                                        html = "";
                                    }
                                    else {
                                        html = '<div class="timeline__box mzkheight mzktimelinebox"><div class="timeline__date mzkpanalchild">' +
                                            '<span class="timeline__day ' + day + '">' + day + '</span>' +
                                            '<span class="timeline__month ' + month + '">' + month + '</span></div>' +
                                            '<div class="timeline__post">' +
                                            '<div class="timeline__content"> ' +
                                            '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + '</span>' +
                                            '<p> ' + name + '</p>' +
                                            '<span class="mzkicon ' + spanClass + '">' +
                                            '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                            '</span>' +
                                            '</div></div></div>';
                                        $(idEncounter).parent().parent().parent().parent().append(html);
                                        html = "";
                                    }
                                }
                                else {
                                    html = '<div class="accordion"><div class="timeline__box mzkheight mzktimelinebox"><div class="timeline__date">' +
                                        '<span class="timeline__day ' + day + '">' + day + '</span>' +
                                        '<span class="timeline__month ' + month + '">' + month + '</span></div>' +
                                        '<div class="timeline__post">' +
                                        '<div class="timeline__content"> ' +
                                        '<span id="' + id + '" encounterID="' + encounterID + '" class="timelineentity">' + entity + collapseHTML + '</span>' +
                                        '<p> ' + name + '</p>' +
                                        '<span class="mzkicon ' + spanClass + '">' +
                                        '<img class="mzkimg ' + imgClass + '" src="https://owaismazik.github.io/PatientTimeLine/src/images/' + imageName + '">' +
                                        '</span>' +
                                        '</div></div></div></div>';
                                }
                            }
                        }
                        $("#" + year).append(html);
                        html = "";
                    }
                }
            }

            $(".timeline__group").each(function () {
                var timelineboxcount = $(this).find(".timeline__box").length;
                if (timelineboxcount <= 0) {
                    $(this).hide();
                }
                else {
                    $(this).show();
                }
            });

            $("#loading").hide();
            $(".loader").hide();
            $("#timelinecontrolnew").show();
            $(".timeline__content").on("click", function () {
                $(this.children[0].firstElementChild).toggleClass("move")
            });
            $(function () {
                $(".accordion").accordion({
                    collapsible: true
                });
            });
            var collapseAll = function () {
                $(".accordion").accordion("option");
            }
        }

        function getTypeImageName(a) {
            switch (a) {
                case 1: return "../webresources/msemr_AppointmentsEMRSVG";
                case 2: return "../webresources/msemr_devicesvg";
                case 3: return "../webresources/msemr_medicationrequestSVG";
                case 4: return "../webresources/msemr_NutritionOrdersSVG";
                case 5: return "../webresources/msemr_tc_icon_task_svg";
                case 6: return "../webresources/msemr_ProceduresSVG";
                case 7: return "../webresources/msemr_ReferralRequestsSVG";
                case 8: return "../webresources/msemr_EncountersSVG";
                case 9: return "./src/images/msemr_careplanSVG.svg";
                case 10: return "../webresources/msemr_CarePlanGoalSVG";
                case 11: return "./src/images/msemr_allergyintolerancesSVG.svg";
                case 12: return "./src/images/msemr_ObservationSVG.svg";
                default: return "./src/images/msemr_careplanSVG.svg";
            }
        }

        function getTypeImageAltName(a) {
            switch (a) {
                case 1: return "Appointment";
                case 2: return "Device";
                case 3: return "Medication";
                case 4: return "Nutrition Order";
                case 5: return "Task";
                case 6: return "Procedure";
                case 7: return "Referral";
                case 8: return "Encounter";
                case 9: return "Care Plan";
                case 10: return "Goal";
                case 11: return "Allergy";
                case 12: return "Observation";
                default: return "";
            }
        }

        function openForm(recordId, entityName) {
            var entityFormOptions = {};
            entityFormOptions["entityName"] = entityName;
            entityFormOptions["entityId"] = recordId;
            entityFormOptions["openInNewWindow"] = true;

            parent.Xrm.Navigation.openForm(entityFormOptions).then(
                function (success) {
                },
                function (error) {
                    console.log(error);
                });
        }

        var dateSort = function (m, n) {
            var s = new Date(m.dateTime), e = new Date(n.dateTime);
            if (s > e) return 1;
            if (s < e) return -1;
            return 0;
        };

    }

    function GetEntityImageData(entity) {
        ////var spanClass = "";
        ////var imgClass = "";
        //var obj = "";
        switch (entity) {
            case "Allergy Intolerance":
                objData.imageName = "allergy.png";
                objData.spanClass = "mzkaleryspan";
                objData.imgClass = 'mzkalergyimg';
                break;
            case "MedicationRequest":
                objData.imageName = "allergy.png";
                objData.spanClass = "mzkaleryspan";
                objData.imgClass = 'mzkalergyimg';
                break;
            case "Coverage":
                objData.imageName = "allergy.png";
                objData.spanClass = "mzkaleryspan";
                objData.imgClass = 'mzkalergyimg';
                break;
            //Coverage
            case "PractitionerRole":
                objData.imageName = "allergy.png";
                objData.spanClass = "mzkaleryspan";
                objData.imgClass = 'mzkalergyimg';
                break;
            //Immunization
            //DiagnosticReport
            case "DiagnosticReport":
                objData.imageName = "DiagnosticReport.png";
                objData.spanClass = "mzkDiagnosticReportspan";
                objData.imgClass = 'mzkDiagnosticReportimg';
                break;
            case "Immunization":
                objData.imageName = "Immunization.png";
                objData.spanClass = "mzkImmunizationpan";
                objData.imgClass = 'mzkImmunizationimg';
                break;
            case "DocumentReference":
                objData.imageName = "DocumentReference.png";
                objData.spanClass = "mzkDocumentReferencespan";
                objData.imgClass = 'mzkDocumentReferenceimg';
                break;
            case "Observation":
                objData.imageName = "Observation.png";
                objData.spanClass = "mzkobserspan";
                objData.imgClass = 'mzkobserimg';
                break;
            case "Condition":
                objData.imageName = "conditon.png";
                objData.spanClass = "mzkobserspan";
                objData.imgClass = 'mzkobserimg';
                break;
            case "MedicationOrder":
                objData.imageName = "MedicationOrder.png";
                objData.spanClass = "mzkmedicationspan";
                objData.imgClass = 'mzkmedicationimg';
                break;
            case "Procedure":
                objData.imageName = "procedure.png";
                objData.spanClass = "mzkprocedurerspan";
                objData.imgClass = 'mzkprocedureimg';
                break;
            case "ProcedureRequest":
                objData.imageName = "request.png";
                objData.spanClass = "mzkprocreqspan";
                objData.imgClass = 'mzkprocreqimg';
                break;
            case "Encounter":
                objData.imageName = "encounter.png";
                objData.spanClass = "mzkencounterspan";
                objData.imgClass = 'mzkencounterimg';
                break;
            case "AdverseEvent":
                objData.imageName = "AdverseEvent.png";
                objData.spanClass = "mzkAdverseEventspan";
                objData.imgClass = 'mzkAdverseEventimg';
                break;
            case "AllergyIntolerance":
                objData.imageName = "AllergyIntolerance.png";
                objData.spanClass = "mzkAllergyIntolerancespan";
                objData.imgClass = 'mzkAllergyIntoleranceimg';
                break;
            case "Binary":
                objData.imageName = "Binary.png";
                objData.spanClass = "mzkBinaryspan";
                objData.imgClass = 'mzkBinaryimg';
                break;
            case "Care Team":
                objData.imageName = "CareTeam.png";
                objData.spanClass = "mzkCareTeamspan";
                objData.imgClass = 'mzkCareTeamimg';
                break;
            case "Careplan":
                objData.imageName = "Careplan.png";
                objData.spanClass = "mzkCareplanspan";
                objData.imgClass = 'mzkCareplanimg';
                break;
            case "Consent":
                objData.imageName = "Consent.png";
                objData.spanClass = "mzkConsentspan";
                objData.imgClass = 'mzkConsentimg';
                break;
            case "Coverage":
                objData.imageName = "Coverage.png";
                objData.spanClass = "mzkCoveragespan";
                objData.imgClass = 'mzkCoverageimg';
                break;
            case "Device":
                objData.imageName = "Device.png";
                objData.spanClass = "mzkDevicespan";
                objData.imgClass = 'mzkDeviceimg';
                break;
            case "ExplanationOfBenefit":
                objData.imageName = "ExplanationOfBenefit.png";
                objData.spanClass = "mzkExplanationOfBenefitspan";
                objData.imgClass = 'mzkExplanationOfBenefitimg';
                break;
            case "Goal":
                objData.imageName = "Goal.png";
                objData.spanClass = "mzkGoalspan";
                objData.imgClass = 'mzkGoalimg';
                break;
            case "Location":
                objData.imageName = "Location.png";
                objData.spanClass = "mzkLocationspan";
                objData.imgClass = 'mzkLocationimg';
                break;
            case "Organization":
                objData.imageName = "Organization.png";
                objData.spanClass = "mzkOrganizationspan";
                objData.imgClass = 'mzkOrganizationimg';
                break;
            case "Practitioner":
                objData.imageName = "Practitioner.png";
                objData.spanClass = "mzkPractitionerspan";
                objData.imgClass = 'mzkPractitionerimg';
                break;
            case "RelatedPerson":
                objData.imageName = "RelatedPerson.png";
                objData.spanClass = "mzkRelatedPersonspan";
                objData.imgClass = 'mzkRelatedPersonimg';
                break;
            case "ResearchStudy":
                objData.imageName = "ResearchStudy.png";
                objData.spanClass = "mzkResearchStudyspan";
                objData.imgClass = 'mzkResearchStudyimg';
                break;
            case "Review":
                objData.imageName = "Review.png";
                objData.spanClass = "mzkReviewspan";
                objData.imgClass = 'mzkReviewimg';
                break;
            case "ServiceRequest":
                objData.imageName = "ServiceRequest.png";
                objData.spanClass = "mzkServiceRequestspan";
                objData.imgClass = 'mzkServiceRequestimg';
                break;
            default:
                objData.imageName = "";
                objData.spanClass = "";
                objData.imgClass = "";
        }
        return objData;
    }

    $(".changeOrderClass").on("click", function () {
        var value = $('#changeOrder').val();
        if (value == "true") {
            $('#changeOrder').val(false);
            timeline();
        }
        else {
            $('#changeOrder').val(true);
            timeline();
        }
    });

})(window);
