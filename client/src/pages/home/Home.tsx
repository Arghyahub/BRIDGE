import { HandCoinsIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Loader from "@/components/reusables/Loader";
import { BridgeProvider, Chain, Route, Token } from "@/types/types";
import { cn } from "@/lib/utils";
import DropDown from "@/components/reusables/DropDown";
import DataDialog from "@/components/reusables/DataDialog";

const SERVER = import.meta.env.VITE_SERVER;

interface formEvent {
  target: {
    amt: HTMLInputElement;
  };
}

const Home = () => {
  const [Loading, setLoading] = useState(false);
  const [CryptoOptions, setCryptoOptions] = useState<BridgeProvider[]>([]);
  const [SelectedBridge, setSelectedBridge] = useState<BridgeProvider | null>(
    null
  );

  // Chain
  const [SrcChainName, setSrcChainName] = useState<null | string>(null);
  const [SrcChain, setSrcChain] = useState<null | Chain>(null);
  const [DestChainName, setDestChainName] = useState<null | string>(null);
  const [DestChain, setDestChain] = useState<null | Chain>(null);

  // Token
  const [SrcTokenName, setSrcTokenName] = useState<null | string>(null);
  const [SrcToken, setSrcToken] = useState<Token | null>(null);
  const [DestTokenName, setDestTokenName] = useState<null | string>(null);
  const [DestToken, setDestToken] = useState<Token | null>(null);

  // Quote
  const [Quotes, setQuotes] = useState<Route[] | null>(null);
  const [SelectedQuote, setSelectedQuote] = useState<Route | null>(null);

  // Bridge params
  const [BridgingParams, setBridgingParams] = useState<null | Object>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${SERVER}/tokens`);
      const data = await response.json();
      setCryptoOptions(data.data);
      setSelectedBridge(data.data[0]);
      // setSrcSupportedChains(data.data[0].supportedChains);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuote = async (
    e: React.FormEvent<HTMLFormElement> & formEvent
  ) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${SERVER}/quotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          srcChainId: SrcChain?.chainId,
          srcQuoteTokenAddress: SrcToken?.address,
          srcQuoteTokenAmount: e.target?.amt.value,
          dstChainId: DestChain?.chainId,
          dstQuoteTokenAddress: DestToken?.address,
          decimals: SrcToken?.decimals,
        }),
      });

      const { data } = await response.json();

      setQuotes(data);
      setSelectedQuote(data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectQuote = async (route: Route) => {
    setSelectedQuote(route);
  };

  const handleBridging = async () => {
    // console.log(SelectedQuote);
    try {
      setLoading(true);
      const response = await fetch(`${SERVER}/params`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          srcChainId: Number(SelectedQuote?.srcChainId),
          srcQuoteTokenAddress: SelectedQuote?.srcQuoteTokenAddress,
          srcQuoteTokenAmount: SelectedQuote?.srcQuoteTokenAmount,
          dstChainId: Number(SelectedQuote?.dstChainId),
          dstQuoteTokenAddress: SelectedQuote?.dstQuoteTokenAddress,
          receiver: SelectedQuote?.dstQuoteTokenAddress,
          bridgeProvider: SelectedQuote?.bridgeDescription.provider,
          srcBridgeTokenAddress:
            SelectedQuote?.bridgeDescription.srcBridgeTokenAddress,
          dstBridgeTokenAddress:
            SelectedQuote?.bridgeDescription.dstBridgeTokenAddress,
          srcSwapProvider: SelectedQuote?.srcSwapDescription.provider,
        }),
      });
      const data = await response.json();
      console.log(data);
      setBridgingParams(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (SrcChainName) {
      const chain = SelectedBridge?.supportedChains.find(
        (chain) => chain.name === SrcChainName
      );
      setSrcChain(chain);
    }
  }, [SrcChainName]);

  useEffect(() => {
    if (DestChainName) {
      const chain = SelectedBridge?.supportedChains.find(
        (chain) => chain.name === DestChainName
      );
      setDestChain(chain);
    }
  }, [DestChainName]);

  useEffect(() => {
    if (SrcTokenName) {
      const token = SrcChain?.supportedTokens.find(
        (token) => token.symbol === SrcTokenName
      );
      setSrcToken(token);
    }
  }, [SrcTokenName]);

  useEffect(() => {
    if (DestTokenName) {
      const token = DestChain?.supportedTokens.find(
        (token) => token.symbol === DestTokenName
      );
      setDestToken(token);
    }
  }, [DestTokenName]);

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-row items-center gap-2 bg-slate-500 px-4 py-4 text-white">
        <h1 className="font-medium text-2xl caplitalize">Crypto Bridge</h1>
        <HandCoinsIcon />
      </div>
      {Loading ? (
        <Loader />
      ) : (
        <div className="flex flex-row justify-center gap-3 bg-gradient-to-r from-slate-800 to-slate-700 px-5 lg:px-20 py-4 w-full h-full text-white">
          <div className="flex flex-col gap-4 max-w-[600px]">
            <h1 className="font-medium font-serif text-xl">
              Bridges allow different blockchain networks to communicate with
              one another and exchange assets and information
            </h1>
            <div className="flex flex-row flex-wrap flex-wrap items-center gap-2 mt-4">
              <p>Available options : </p>
              {CryptoOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedBridge(option)}
                  className={cn(
                    "bg-white px-2 py-1 text-xs rounded-md text-black",
                    {
                      "bg-cyan-500 text-white":
                        SelectedBridge?.name === option.name,
                    }
                  )}
                >
                  {option.name}
                </button>
              ))}
            </div>
            <div className="flex flex-row flex-wrap mt-2 w-full">
              <p className="text-nowrap">From : </p>
              <div className="flex flex-row gap-3 ml-4">
                <DropDown
                  title="Supported Chains"
                  setState={setSrcChainName}
                  State={SrcChainName}
                  datas={
                    SelectedBridge?.supportedChains.map((chain) => ({
                      name: chain.name,
                    })) || []
                  }
                />
                {SrcChain && (
                  <DropDown
                    title="Supported Tokens"
                    State={SrcTokenName}
                    setState={setSrcTokenName}
                    datas={
                      SrcChain?.supportedTokens.map((token) => ({
                        name: token.symbol,
                      })) || []
                    }
                  />
                )}
              </div>
            </div>
            <div className="flex flex-row flex-wrap gap-4 w-full">
              <p className="text-nowrap">To :</p>
              <div className="flex flex-row gap-3 ml-5">
                <DropDown
                  title="Supported Chains"
                  State={DestChainName}
                  setState={setDestChainName}
                  datas={
                    SelectedBridge?.supportedChains.filter((chain) => {
                      if (SrcChain && SrcChain.name === chain.name)
                        return false;
                      return { name: chain.name };
                    }) || []
                  }
                />
                {DestChain && (
                  <DropDown
                    title="Supported Tokens"
                    State={DestTokenName}
                    setState={setDestTokenName}
                    datas={
                      DestChain?.supportedTokens.map((token) => ({
                        name: token.symbol,
                      })) || []
                    }
                  />
                )}
              </div>
            </div>
            <form
              onSubmit={handleQuote}
              className="flex flex-row items-center gap-4 mt-5 max-w-36"
            >
              <label htmlFor="amt" className="text-nowrap">
                Amount :
              </label>
              <input
                type="number"
                placeholder="Amount"
                name="amt"
                defaultValue={1}
                className="px-2 py-1 rounded-md text-black"
              />

              <button
                disabled={!SrcChain || !SrcToken || !DestChain || !DestToken}
                className={cn(
                  "flex bg-cyan-500 text-white px-2 py-1 rounded-md w-16 mt-2  h-full flex-row justify-center ",
                  {
                    "bg-slate-300 text-slate-700":
                      !SrcChain || !SrcToken || !DestChain || !DestToken,
                  }
                )}
              >
                Quote
              </button>
            </form>

            {Quotes && (
              <div className="flex flex-col gap-4 bg-slate-700 p-3 border border-black rounded-md w-full">
                <p>Compare Bridges and gas</p>
                <div className="flex flex-row flex-wrap gap-4">
                  {Quotes.map((quote, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectQuote(quote)}
                      className={cn(
                        "flex flex-col bg-white px-2 py-1 rounded-md text-black",
                        {
                          "bg-cyan-500 text-white": SelectedQuote == quote,
                        }
                      )}
                    >
                      <p>Bridge : {quote.bridgeDescription.provider}</p>
                      <p>Gas : {quote.estimatedGas}</p>
                    </button>
                  ))}
                </div>
                {SelectedQuote && (
                  <div className="flex flex-row justify-center mt-3 w-full">
                    <button
                      onClick={handleBridging}
                      className="flex justify-center bg-yellow-400 px-2 py-1 rounded-md w-28 text-black text-center"
                    >
                      Bridge
                    </button>
                  </div>
                )}

                {BridgingParams && (
                  <DataDialog Title="Bridge Params" data={BridgingParams} />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
