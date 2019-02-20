import { observable, action, computed } from "mobx";
import tabs from "../components/environment/tabs/tabs";

export class ReportStore {
 
  @observable radioButtonDetails: boolean = false;
  @observable visible: boolean = false;

  @action
  setVisible() {
    this.visible = !this.visible;
  }

  incidentDetails = observable(
    {
      progress: true,
      date: ["", 0],
      time: ["", 0],
      late: false,

      get getProgress(): number {
        return Number(this.date[1]) + Number(this.time[1]);
      },
      checkBoxIncident() {
        this.late = !this.late;
      },
      dateOfIncident(date: string) {
        this.date = [
          date,
          date ? Math.ceil(100 / tabs.INCIDENT_TAB.inputs) : 0
        ];
      },
      timeOfIncident(time: string) {
        this.time = [
          time,
          time ? Math.ceil(100 / tabs.INCIDENT_TAB.inputs) : 0
        ];
      }
    },
    {
      checkBoxIncident: action,
      dateOfIncident: action,
      timeOfIncident: action
    }
  );
////////////////////////////////////////////
  basicDetails = observable(
    {
      // observable properties:
      date: ["", 0],
      time: ["", 0],
      late: false,
      incidentType: ["", 0],
      workSafety: false,
      categoryType: ["", 0],
      subCategoryType: ["", 0],
      siteType: ["", 0],
      locationType: ["", 0],
      contractType: ["", 0],
      selectedRadio: "",
      radioButtons: ["Environmental", "Health & Safety"],
      progress: true,

      get getWorkSatefy(): boolean {
        return this.workSafety;
      },
      get getProgress(): number {
        const add =
          Number(this.incidentType[1]) +
          Number(this.locationType[1]) +
          Number(this.categoryType[1]) +
          Number(this.siteType[1]) +
          Number(this.subCategoryType[1]) +
          Number(this.contractType[1]) +
          (this.selectedRadio
            ? Math.ceil(100 / tabs.BASIC_DETAILS_TAB.inputs)
            : 0);
        return add;
      },
      setIncidentType(str: string) {
        this.incidentType = [
          str,
          str ? Math.ceil(100 / tabs.BASIC_DETAILS_TAB.inputs) : 0
        ];
      },
      setCategoryHandler(str: string) {
        this.categoryType = [
          str,
          Math.ceil(100 / tabs.BASIC_DETAILS_TAB.inputs)
        ];
      },
      setSubCategoryHandler(str: string) {
        this.subCategoryType = [
          str,
          Math.ceil(100 / tabs.BASIC_DETAILS_TAB.inputs)
        ];
      },
      setSiteHandler(value: number) {
        this.siteType = [
          tabs.BASIC_DETAILS_TAB.siteType[value],
          Math.ceil(100 / tabs.BASIC_DETAILS_TAB.inputs)
        ];
      },
      setContractHandler(value: number) {
        this.contractType = [
          tabs.BASIC_DETAILS_TAB.contractType[value],
          Math.ceil(100 / tabs.BASIC_DETAILS_TAB.inputs)
        ];
      },
      setLocationHandler(str: string) {
        this.locationType = [
          str,
          Math.ceil(100 / tabs.BASIC_DETAILS_TAB.inputs)
        ];
      },
      setWorkSafety() {
        this.workSafety = !this.workSafety;
      },
      setRadioButton(index: number) {
        this.selectedRadio = this.radioButtons[index];
      },
      resetStateIncident() {
        this.date = ["", 0];
        this.time = ["", 0];
        this.late = false;
      }
    },
    {
      resetStateIncident: action,
      setIncidentType: action,
      setWorkSafety: action,
      setLocationHandler: action,
      setContractHandler: action,
      setSiteHandler: action,
      setSubCategoryHandler: action,
      setCategoryHandler: action,
      setRadioButton: action
    }
  );
  ////////////////////////////////////////////////////////
  moreDetails = observable(
    {
      // observable properties:
      blueLight: false,
      greaterSeverity: false,
      personInjured: false,
      treatedAider: false,
      fitToWork: false,
      investigator: ["", 0],
      reportee: ["", 0],
      progresss: true,
      // computed property:
      get getBlueLight() {
        return this.blueLight;
      },
      get getProgress(): number {
        return (this.investigator[0] ? 50 : 0) + (this.reportee[0] ? 50 : 0);
      },

      setBlueLight() {
        this.blueLight = !this.blueLight;
      },
      setSeverity() {
        this.greaterSeverity = !this.greaterSeverity;
      },
      setPersonInjury() {
        this.personInjured = !this.personInjured;
      },
      setFirstAid() {
        this.treatedAider = !this.treatedAider;
      },
      setFitToWork() {
        this.fitToWork = !this.fitToWork;
      },
      setInvestigator(str: string) {
        this.investigator = [str, 50];
      },
      setReportee(str: string) {
        this.reportee = [str, 50];
      }
    },
    {
      setBlueLight: action,
      setSeverity: action,
      setPersonInjury: action,
      setFirstAid: action,
      setFitToWork: action,
      setInvestigator: action,
      setReportee: action
    }
  );
  ///////////////////////////////////////////////




  @computed
  get progressMoreDetails(): number {
    return (
      Number(this.moreDetails.reportee[1]) +
      Number(this.moreDetails.investigator[1])
    );
  }

  @action
  getTabProgress(tab: string): number {
    // switch?
    if (tab === "BASIC_DETAILS_TAB") {
      return this.basicDetails.getProgress;
    }
    if (tab === "INCIDENT_TAB") {
      return this.incidentDetails.getProgress;
    }
    if (tab === "MORE_DETAILS_TAB") {
      return this.moreDetails.getProgress;
    }
    return 0;
  }

  
  @computed
  get getTotalProgress(): boolean {
    const percent =
      this.moreDetails.getProgress +
      this.incidentDetails.getProgress +
      this.basicDetails.getProgress;
    if (percent > 295) {
      return false;
    }
    return true;
  }

@action
resetTab(url: string){
 const currenTab = Object.keys(tabs).filter(tab=>tabs[tab].path===url)[0]
 if (currenTab === "BASIC_DETAILS_TAB") {
  return this.resetStateDetails()
}
if (currenTab === "INCIDENT_TAB") {
  return this.resetStateIncident()
}
if (currenTab === "MORE_DETAILS_TAB") {
  return this.resetStateMoreDetails()
}

}

  @action
  resetStateIncident() {
    this.incidentDetails.date = ["", 0];
    this.incidentDetails.time = ["", 0];
    this.incidentDetails.late = false;
    this.radioButtonDetails = false;
  }
  @action
  resetStateDetails() {
    this.basicDetails.workSafety = false;
    this.basicDetails.incidentType = ["", 0];
    this.basicDetails.categoryType = ["", 0];
    this.basicDetails.locationType = ["", 0];
    this.basicDetails.subCategoryType = ["", 0];
    this.basicDetails.selectedRadio = "";
  }

  @action
  resetStateMoreDetails() {
    this.moreDetails.blueLight = false;
    this.moreDetails.greaterSeverity = false;
    this.moreDetails.personInjured = false;
    this.moreDetails.treatedAider = false;
    this.moreDetails.fitToWork = false;
    this.moreDetails.investigator = ["", 0];
    this.moreDetails.reportee = ["", 0];
  }
  @action
  setRadioButton() {
    this.radioButtonDetails = true;
  }
}

export const reportStore = new ReportStore();
