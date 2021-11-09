import * as util from "util";
import { NextFunction } from "express";

import { RESPONSE_CODES } from "message-catcher";

import { redisClient } from "../../services/connectors/connect-redis";
import { updateUserProfileById } from "../../services/auth/update-user-profile-by-id";

import { UserAttributes } from "../../types/user/user-attributes";
import { errorCatcher } from "../../helpers/error-catcher";
import { responseCatcher } from "../../helpers/response-catcher";
import { findUserById } from "../../services/auth/find-user-by-id";

const redisSetex = util.promisify(redisClient.setex).bind(redisClient);

const EXPIRES_TIME_SEC = 30;

export const updateUserProfile = async (
  userId: string,
  userProfileFieldsToChange: UserAttributes,
  next: NextFunction
) => {
  try {
    console.log("hello");
    const isUserUpdated = await updateUserProfileById(
      userId,
      userProfileFieldsToChange
    );
    console.log(isUserUpdated);
    if (!isUserUpdated) {
      errorCatcher({
        message: "User is not updated",
      });
      return;
    }

    const updatedUserProfile = await findUserById(userId);

    if (!updatedUserProfile) {
      errorCatcher({
        message: "Updated user is not found",
      });
      return;
    }
    console.log(updatedUserProfile);
    await redisSetex(
      "userProfile:" + userId,
      EXPIRES_TIME_SEC,
      JSON.stringify(updatedUserProfile)
    );

    next(
      responseCatcher<UserAttributes>({
        responseCode: RESPONSE_CODES.SUCCESS__CREATED,
        data: {
          data: updatedUserProfile,
          message: "User info is updated",
        },
      })
    );
  } catch (error) {
    next(error);
  }
};