export interface Token {
  symbol: string;
  address: string;
}

export interface Chain {
  name: string;
  supportedTokens: Token[];
}

export interface BridgeProvider {
  name: string;
  logoUrl: string;
  supportedChains: Chain[];
}

export interface SwapDescription {
  chainId: string;
  provider: string;
  srcTokenAddress: string;
  dstTokenAddress: string;
  srcTokenAmount: string;
  dstTokenAmount: string;
  dexNames: string[];
}

export interface BridgeDescription {
  provider: string;
  srcBridgeTokenAddress: string;
  dstBridgeTokenAddress: string;
  srcBridgeTokenAmount: string;
  dstBridgeTokenAmount: string;
  bridgeContractAddress: string;
  bridgeFeeAmount: string;
  bridgeFeeToken: Token;
  srcBridgeToken: Token;
  dstBridgeToken: Token;
}

export interface Route {
  srcQuoteTokenAddress: string;
  srcQuoteTokenAmount: string;
  dstQuoteTokenAddress: string;
  slippage: number;
  srcSwapDescription: SwapDescription;
  bridgeDescription: BridgeDescription;
  dstSwapDescription: SwapDescription;
  dstQuoteTokenAmount: string;
  minReceiveAmount: string;
  affiliateFeeAmount: string;
  withholdingFeeAmount: string;
  routeType: string;
  tags: string[];
  contractAddress: string;
  withholdingFeeToken: Token;
  srcQuoteToken: Token;
  dstQuoteToken: Token;
  srcQuoteTokenUsdValue: string;
  dstQuoteTokenUsdValue: string;
  estimatedGas: string;
}
