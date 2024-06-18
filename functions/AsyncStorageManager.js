import AsyncStorage from "@react-native-async-storage/async-storage";

class AsyncStorageManager {
  constructor() {}
  async saveWorkOutPreset(workOutPreset) {
    console.log(workOutPreset.id);
    const workOutPresetString = JSON.stringify(workOutPreset);
    console.log(workOutPresetString);
    await AsyncStorage.setItem(workOutPreset.id, workOutPresetString);
    // set idlist
    const idsString = await AsyncStorage.getItem("workOutPresetIDs");
    const ids = idsString ? JSON.parse(idsString) : [];
    if (!ids.includes(workOutPreset.id)) {
      ids.push(workOutPreset.id);
      await AsyncStorage.setItem("workOutPresetIDs", JSON.stringify(ids));
    }
    const test = await this.getAllWorkoutPresets();
  }
  async getWorkOutPreset(id) {
    try {
      const workOutPresetString = await AsyncStorage.getItem(id);
      const result = await JSON.parse(workOutPresetString);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllWorkoutPresets() {
    try {
      const idsString = await AsyncStorage.getItem("workOutPresetIDs");
      const ids = idsString ? JSON.parse(idsString) : [];
      console.log(ids);
      const workOutPresets = {};
      for (const id of ids) {
        const workOutPresetString = await AsyncStorage.getItem(id);
        const workOutPreset = await JSON.parse(workOutPresetString);
        workOutPresets[id] = workOutPreset;
      }
      console.log(workOutPresets);
      return workOutPresets;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteWorkoutPreset(id) {
    try {
      console.log("delete", id);
      await AsyncStorage.removeItem(id);
      const idsString = await AsyncStorage.getItem("workOutPresetIDs");
      const ids = idsString ? JSON.parse(idsString) : [];
      const newIds = ids.filter((item) => item !== id);
      await AsyncStorage.setItem("workOutPresetIDs", JSON.stringify(newIds));
    } catch (error) {}
  }
}
export default AsyncStorageManager;
