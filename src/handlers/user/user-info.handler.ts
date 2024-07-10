import { Request, Response } from 'express';
import { User } from '../../model/user/user.model';
import { handleError, handleSuccess } from '../auth/auth.handler';

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
        $set: {
          'userInfo.phone': phone,
          'userInfo.address': address,
          'userInfo.city': city,
          'userInfo.state': state,
          'userInfo.country': country,
          'userInfo.postalCode': postalCode,
          'userInfo.skills': skills,
          'userInfo.experience': experience,
          'userInfo.education': education,
          'userInfo.resumeUrl': resumeUrl,
          'userInfo.portfolioUrl': portfolioUrl,
          'userInfo.linkedInProfile': linkedInProfile,
          'userInfo.githubProfile': githubProfile,
          'userInfo.website': website,
        },
      },
      { new: true }
    );

    if (updateUser) {
      return handleSuccess(res,'User info updated successfully')
    } else {
      return handleError(res,'Failed to update user info',500)
    }
  } catch (error) {
    console.error("Error updating user info:", error);
    return handleError(res,'Failed to update user info',500)
  }
}
