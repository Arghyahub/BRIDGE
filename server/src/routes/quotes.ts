import { Router, Request } from "express";
import Constants from "../constants";
import { Route } from "../types/types";

const router = Router();
const API_URL = Constants.API;

interface QuoteRequest extends Request {
  body: {
    srcChainId?: string;
    dstChainId?: string;
    srcQuoteTokenAddress?: string;
    dstQuoteTokenAddress?: string;
    srcQuoteTokenAmount?: string;
    decimals?: number;
  };
}

interface QuoteResponse {
  success: boolean;
  routes: Route[];
}

router.post("/", async (req: QuoteRequest, res) => {
  // Checking for required fields
  const {
    srcChainId,
    srcQuoteTokenAddress,
    srcQuoteTokenAmount,
    dstChainId,
    dstQuoteTokenAddress,
    decimals,
  } = req.body;
  if (
    !srcChainId ||
    !srcQuoteTokenAddress ||
    !srcQuoteTokenAmount ||
    !dstChainId ||
    !dstQuoteTokenAddress ||
    !decimals
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let URL = `${API_URL}/quote`;
    URL += `?srcChainId=${srcChainId}`;
    URL += `&srcQuoteTokenAddress=${srcQuoteTokenAddress}`;
    URL += `&srcQuoteTokenAmount=${srcQuoteTokenAmount + "0".repeat(decimals)}`;
    URL += `&dstChainId=${dstChainId}`;
    URL += `&dstQuoteTokenAddress=${dstQuoteTokenAddress}`;
    URL += `&slippage=1`;
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: QuoteResponse = await response.json();
    if (data.success) {
      res.status(200).json({ data: data.routes });
    } else {
      res.status(400).json({ error: "Failed to fetch quote" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
