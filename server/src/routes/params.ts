import { Router, Request } from "express";
import Constants from "../constants";

const router = Router();
const API_URL = Constants.API;

interface ParamsRequest extends Request {
  body: {
    srcChainId?: number;
    srcQuoteTokenAddress?: string;
    decimal?: number;
    srcQuoteTokenAmount?: string;
    dstChainId?: number;
    dstQuoteTokenAddress?: string;
    receiver?: string;
    bridgeProvider?: string;
    srcBridgeTokenAddress?: string;
    dstBridgeTokenAddress?: string;
    srcSwapProvider?: string;
    // dstSwapProvider?: string;
  };
}

router.post("/", async (req: ParamsRequest, res) => {
  const {
    bridgeProvider,
    // decimal,
    dstBridgeTokenAddress,
    dstChainId,
    dstQuoteTokenAddress,
    // dstSwapProvider,
    receiver,
    srcBridgeTokenAddress,
    srcChainId,
    srcQuoteTokenAddress,
    srcQuoteTokenAmount,
    srcSwapProvider,
  } = req.body;
  if (
    !srcChainId ||
    !srcQuoteTokenAddress ||
    // !decimal ||
    !srcQuoteTokenAmount ||
    !dstChainId ||
    !dstQuoteTokenAddress ||
    !receiver ||
    !bridgeProvider ||
    !srcBridgeTokenAddress ||
    !dstBridgeTokenAddress ||
    // !dstSwapProvider
    !srcSwapProvider
  )
    res.status(400).json({ error: "Missing required fields" });

  let URL = `${API_URL}/buildTx`;
  URL += `?srcChainId=${srcChainId}`;
  URL += `&srcQuoteTokenAddress=${srcQuoteTokenAddress}`;
  // URL += `&srcQuoteTokenAmount=${srcQuoteTokenAmount + "0".repeat(decimal)}`;
  URL += `&srcQuoteTokenAmount=${srcQuoteTokenAmount}`;
  URL += `&dstChainId=${dstChainId}`;
  URL += `&dstQuoteTokenAddress=${dstQuoteTokenAddress}`;
  URL += `&slippage=1`;
  URL += `&receiver=${receiver}`;
  URL += `&bridgeProvider=${bridgeProvider}`;
  URL += `&srcBridgeTokenAddress=${srcBridgeTokenAddress}`;
  URL += `&dstBridgeTokenAddress=${dstBridgeTokenAddress}`;
  URL += `&srcSwapProvider=${srcSwapProvider}`;
  // URL += `&dstSwapProvider=${dstSwapProvider}`;

  try {
    const response = await fetch(URL, {
      method: "GET",
    });

    const data = await response.json();
    if (data.success) {
      res.status(200).json(data.route);
    } else {
      console.log(data);
      res.status(400).json({ error: "Failed to fetch params" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to fetch params" });
  }
});

export default router;
