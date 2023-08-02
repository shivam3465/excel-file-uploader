import { User } from "../models/user.js";

export const insertCandidates = async (item) => {
  //checking for duplication in the database with current email id of the candidate
  const user = await User.findOne({ email: item["2"] });

  // if user is not found in the database then inserting it in the database
  if (!user) {
    await User.create({
      name: item["1"],
      email: item["2"],
      phoneNumber: item["3"],
      dob: item["4"],
      workExperience: item["5"],
      resumeTitle: item["6"],
      currentLocation: item["7"],
      postalAddress: item["8"],
      currentEmployer: item["9"],
      currentDesignation: item["10"],
    });
  }
};
