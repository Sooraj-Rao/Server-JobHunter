import { Request, Response } from "express";
import { User } from "../../model/user/user.model";

export default async function UpdateUser(req: Request, res: Response) {
  try {
    const {
      phone,
      address,
      city,
      state,
      country,
      postalCode,
      skills,
      experience,
      education,
      resumeUrl,
      portfolioUrl,
      linkedInProfile,
      githubProfile,
      website,
    } = req.body;

    const authUser = req.user;

    const updateUser = await User.findByIdAndUpdate(
      authUser.id,
      {
        userInfo: {
          phone,
          address,
          city,
          state,
          country,
          postalCode,
          skills,
          experience,
          education,
          resumeUrl,
          portfolioUrl,
          linkedInProfile,
          githubProfile,
          website,
        },
      },
      { new: true }
    );

    if (updateUser) {
      return res.status(201).json({
        message: "User info updated successfully",
        error: false,
      });
    } else {
      return res.status(500).json({
        error: true,
        message: "Failed to update user info",
      });
    }
  } catch (error) {
    console.error("Error updating user info:", error);
    return res.status(500).json({
      error: true,
      message: "Failed to update user info",
    });
  }
}
