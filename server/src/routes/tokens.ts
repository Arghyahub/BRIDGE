import { Router } from "express";
import Constants from "../constants";
import { BridgeProvider } from "../types/types";
import * as text from "./text.json";

const router = Router();
const API_URL = Constants.API;

interface SupportedBridgeResponse {
  success: boolean;
  supportedBridgeProviders: BridgeProvider[];
}

router.get("/", async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/supportedBridgeProviders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: SupportedBridgeResponse = await response.json();
    if (data.success) {
      res.status(200).json({ data: data.supportedBridgeProviders });
    } else {
      res.status(400).json({ error: "Failed to fetch bridge providers" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
