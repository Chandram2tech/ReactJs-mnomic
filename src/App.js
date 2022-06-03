import logo from "./logo.svg";
import "./App.css";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { ApiPromise, WsProvider } from "@polkadot/api";
import ValidatorSelector from "./ValidatorSelector";
import { Keyring } from "@polkadot/api";
import { useState } from "react";
import { cryptoWaitReady } from "@polkadot/util-crypto";

function App() {
  const [type, setType] = useState();
  const [mnemonic, setMnemonic] = useState();
  const [providerUrl, setProviderUrl] = useState();
  const [loading, setLoading] = useState(false);
  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const handleChangeMnemonic = (event) => {
    setMnemonic(event.target.value);
  };
  const handleChangeProviderUrl = (event) => {
    setProviderUrl(event.target.value);
  };
  const checkValidtor = async () => {
    // Create a keyring instance
    await cryptoWaitReady();

    debugger;
setLoading(true)
    const keyring = new Keyring({ type });
    // Some mnemonic phrase
    const PHASE1 = "";

    // Add an account, straight mnemonic

    // (Advanced) add an account with a derivation path (hard & soft)
    // const  alice = keyring.addFromUri(`${PHRASE}//hard-derived/soft-derived`);

    try {
      const newPair = keyring.addFromUri(mnemonic);
      debugger;

      const api = await ApiPromise.create({
        provider: new WsProvider(providerUrl),
      });
      debugger;

      console.log(`${api}`);
      const selector = new ValidatorSelector(api);
      console.log(`${api}`);

      const fata = await selector.getUserValidatorsMeetCriteria(
        newPair.address
      );
      setLoading(false)
      alert('Sucess')
      console.log(`${api}`);
    } catch (error) {
      setLoading(false)
      const yerro = error;
      alert(yerro)

      console.log(`${error}`);
    }
  };
  console.log("value", type);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "& .MuiTextField-root": { width: "25ch" },
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TextField
            value={type}
            style={{
              marginTop: 20,
            }}
            id="outlined-basic"
            label="Keyring type"
            variant="outlined"
            onChange={handleChangeType}
          />

          <TextField
            value={mnemonic}
            style={{
              marginTop: 20,
            }}
            id="outlined-basic"
            label="mnemonic"
            variant="outlined"
            onChange={handleChangeMnemonic}
          />

          <TextField
            value={providerUrl}
            style={{
              marginTop: 20,
            }}
            id="outlined-basic"
            label="provider url"
            variant="outlined"
            onChange={handleChangeProviderUrl}
          />
        </>
      )}

      <Button
        style={{
          marginTop: 20,
        }}
        disabled={loading}
        onClick={() => {
          checkValidtor();
        }}
        variant="contained"
      >
        Contained
      </Button>
    </Box>
  );
}

export default App;
