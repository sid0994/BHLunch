sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel',
	'sap/m/MessageBox'
], function(Controller, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("BHEvent.controller.View1", {
		onInit: function() {
			// create model
			this.oModel = new JSONModel();
			this.getView().setModel(this.oModel);
			debugger;

			//matchLunchEvent(Events) takes the events and modifies the data so that it fits the model 
			this.matchLunchEvent([{
				start: 225,
				end: 285
			}, {
				start: 210,
				end: 270
			}, {
				start: 180,
				end: 240
			}, {
				start: 240,
				end: 300
			}, {
				start: 300,
				end: 360
			}, {
				start: 270,
				end: 330
			}]);
			

		},
		matchLunchEvent: function(lData) {

			// var oData = lData;
			// var that = this;
			// $.ajax({
			// 	async: false,
			// 	url: "model/event.json",
			// 	success: function(oData) {

			// 		lData = that.modifyData(oData);
			// 		console.log(oData);

			// 	},
			// 	error: function(err) {
			// 		console.log(err);
			// 	}
			// });
			lData = this.modifyLunchEventData(lData);
			lData = this.checkBrilliantMatchLunch(lData);
			var data = {
				startDate: new Date("2018", "11", "04", "09", "00"),
				people: [{

					appointments: lData

				}]
			};
			this.oModel.setData(data);
			this.oModel.refresh(true);
			return lData;
		},
		checkBrilliantMatchLunch: function(oData) {

			var matchedTime = 0;
			var otherMatchedLunchTime = 0;
			var f = 1;
			for (var i = 1; i < oData.length; i++) {
				if ((oData[0].start >= oData[i].start && oData[0].start <= oData[i].end)) {
					matchedTime = oData[i].end - oData[0].start;
					if (otherMatchedLunchTime < matchedTime) {
						otherMatchedLunchTime = matchedTime;
						f = i;
					}
				}
				if (oData[0].end >= oData[i].start && oData[0].end <= oData[i].end) {
					matchedTime = oData[0].end - oData[i].start;
					if (otherMatchedLunchTime < matchedTime) {
						otherMatchedLunchTime = matchedTime;
						f = i;
					}
				}
			}
			if (otherMatchedLunchTime >= 30) {
				oData[0].colour = "#00ff00";
				oData[f].colour = "#00ff00";
			}
			return oData;
		},

		modifyLunchEventData: function(oData) {
			for (var i = 0; i < oData.length; i++) {
				if (i === 0) {
					oData[i].title = "Me";
					oData[i].colour = "#000000";
				} else {
					oData[i].title = "Brilliant Lunch";
					oData[i].colour = "#3399ff";
				}
				oData[i].startTime = this.getTimeDetail(oData[i].start);
				oData[i].endTime = this.getTimeDetail(oData[i].end);
			}
			return oData;
		},
		getTimeDetail: function(evaluatedTime) {
			var startHour = Math.floor(evaluatedTime / 60) + 9;
			var startMin = evaluatedTime % 60;
			var date = new Date("2018", "11", "04", startHour, startMin);
			return date;
		}
	});

});