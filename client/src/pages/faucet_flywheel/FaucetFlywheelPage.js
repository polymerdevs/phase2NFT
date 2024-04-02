import '../../App.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function FaucetFlywheelPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 20,
          marginRight: 0
        }}
      >
        <ConnectButton />
      </div>
      <div className='flex flex-col py-0 mx-auto px-4 items-center justify-center'>
        <p>
          Faucet Flywheel Page
        </p>
      </div>
    </main>
  );
}

export default FaucetFlywheelPage;
