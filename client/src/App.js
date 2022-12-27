import { useEffect, useState } from 'react';
import Main from './components/Main';
import Navbar from './components/Navbar';
import { ethers, providers } from 'ethers';
import DecentragramAbi from './abis/Decentragram.json'
import { create } from 'ipfs-http-client'

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

function App() {

  const [account, setAccount] = useState()
  const [loading, setLoading] = useState()
  const [provider, setProvider] = useState()
  const [decentragram, setDecentragram] = useState()
  const [images, setImages] = useState([])
  const [buffer, setBuffer] = useState()

  async function loadWeb3() {
    if (window.ethereum) {
      setProvider(new ethers.providers.Web3Provider(window.ethereum))
      provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          window.location.reload();
        }
      });
    } else if (window.web3) {
      setProvider(new providers.Web3Provider(window.web3.currentProvider))
      provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          window.location.reload();
        }
      });
    } else {
      window.alert("Non-Ethereum browser. You should consider using MetaMask")
    }
  }

  async function loadBlockChainData() {
    const account = await provider.getSigner()
    setAccount(account)

    const networkId = await provider.getNetwork().chainId
    const networkData = DecentragramAbi.networks[networkId]

    if (networkData) {
      const contract = ethers.Contract(DecentragramAbi, networkData.address, provider)
      setDecentragram(contract)
      const imagesCount = await decentragram.imagesCount()

      const imgs = []
      for (let imgId = 1; imgId < imagesCount; imgId++) {
        const img = await decentragram.image(imgId)
        imgs.push(img)
      }

      setImages(imgs.sort((a, b) => b.tipAmount - a.tipAmount))

    } else {
      window.alert("Decentragram content not deployed to current network!")
    }
  }

  function captureFile(event) {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new FileReader()
    // Preprocess the file to upload to the IPFS
    reader.readAsArrayBuffer(file)

    reader.onload = () => {
      setBuffer(Buffer(reader.result))
      console.log('buffer', buffer)
    }
  }

  async function uploadImage(imageDescription) {
    await ipfs.add(buffer, async (error, result) => {
      console.log("ipfs result", result)
      if (error) {
        console.log("ipfs error", error)
        return
      }

      setLoading(true)
      const transaction = await decentragram.uploadImage(result[0].hash, imageDescription)
      transaction.wait()
      setLoading(false)
      window.location.reload(false);
    })
  }

  async function tipImageOwner(imageId) {
    setLoading(true)
    const transaction = await decentragram.tipImageOwner(imageId)
    transaction.wait()
    setLoading(false)
    window.location.reload(false);
  }

  useEffect(() => {
    async function initBlockChain() {
      setLoading(true)
      await loadWeb3()
      await loadBlockChainData()
      setLoading(false)
    }

    initBlockChain()

    return () => { }
  }, [])


  return (
    <div className='app'>
      <Navbar account={account} />
      {loading
        ? <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        : <Main
          account={account}
          captureFile={captureFile}
          uploadImage={uploadImage}
          images={images}
          tipImageOwner={tipImageOwner}
        />
      }
    </div>
  );
}

export default App;
