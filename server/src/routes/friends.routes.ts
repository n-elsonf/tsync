import express from "express";
import { FriendController } from "../controllers/friends.controller";
import { protect } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validation.middleware";
import { friendValidation } from "../validations/friends.validation";

const router = express.Router();

// All routes are protected
router.use(protect);

// Get friend lists
router.get("/", FriendController.getFriends);

// Get pending friend requests
router.get("/requests", FriendController.getPendingRequests);

// Check friend request
router.get("/requests/:receiverId",
  validateRequest(friendValidation.checkFriendRequest),
   FriendController.checkFriendRequest);

// Friend request operations
router.post(
  "/requests/:userId",
  validateRequest(friendValidation.sendRequest),
  FriendController.sendRequest
);

router.put(
  "/requests/:requestId/accept",
  validateRequest(friendValidation.handleRequest),
  FriendController.acceptRequest
);

router.put(
  "/requests/:requestId/reject",
  validateRequest(friendValidation.handleRequest),
  FriendController.rejectRequest
);

// Friend removal
router.delete(
  "/:friendId",
  validateRequest(friendValidation.removeFriend),
  FriendController.removeFriend
);

export default router;