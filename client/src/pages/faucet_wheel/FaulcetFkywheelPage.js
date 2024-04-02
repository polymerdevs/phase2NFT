import { Fragment, useState, useEffect } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import WheelComponent from 'react-wheel-of-prizes'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { useAccount, useChainId, useChains, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import _ from 'lodash';
import config from '../../common/config.json';
import PolymerERC20Abi from '../../common/PolymerERC20.json';
import { explorerURL } from '../../helpers/helper';

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FaulcetFkywheelPage() {

  const segments = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  ]
  const segColors = [
    '#EE4040',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000'
  ]

  const wallet = useAccount();
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const chains = useChains();
  const currentChainId = useChainId();

  const configUrl = {
    "optimism": {
      "explorerUrl": "https://optimism-sepolia.blockscout.com/"
    },
    "base": {
      "explorerUrl": "https://base-sepolia.blockscout.com/"
    }
  }

  const onFinished = (winner) => {
    if (!wallet) {
      alert('Please connect wallet');
      return false;
    }

    const currentChain = _.find(chains, { id: currentChainId });

    let destPortAddr = '';
    let channelId = '';
    const timeout = 36000;
    if (currentChain.nativeCurrency.replacedName === 'optimism') {
      destPortAddr = config['phase2']['token']['base'];
      channelId = 'channel-10';
    } else {
      destPortAddr = config['phase2']['token']['optimism'];
      channelId = 'channel-11';
    }

    const submit = () => {
      writeContract({
        address: config['phase2']['token'][currentChain.nativeCurrency.replacedName],
        abi: PolymerERC20Abi,
        functionName: 'randomPoints',
        args: [
          destPortAddr,
          ethers.encodeBytes32String(channelId),
          timeout
        ]
      });

      console.log('error', error);
    };

    submit();
  }

  return (
    <div className='bg-white'>
      <header className="bg-white">
        <nav className="mx-auto flex max-w-full items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="https://assets-global.website-files.com/61dd1a9a1229241c240eea18/61dd1a9a12292419230eea32_Logo-Dark.svg" alt="" />
            </a>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                Features
                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {products.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                        </div>
                        <div className="flex-auto">
                          <a href={item.href} className="block font-semibold text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </a>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Pricing
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              About us
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Contract
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Blog
            </a>
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <ConnectButton />
          </div>
        </nav>
      </header>
      <main className="bg-white mb-20">
        <div className="relative isolate overflow-hidden lg:py-32">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <div className="max-w-xl lg:max-w-lg">
                <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                  Polymer <br />
                  Points <br />
                  Faucet <br />
                  Wheel
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-500">
                  Spin the wheel every 10 <br />
                  minutes to get Polymer Points, <br />
                  which can be used to Purchase <br />
                  Polymer Phase 2 NFTs!
                </p>
              </div>
              <dl className="" style={{marginTop: '-150px', marginLeft: '-200px'}}>
                <WheelComponent
                  segments={segments}
                  segColors={segColors}
                  winningSegment='won 10'
                  onFinished={(winner) => onFinished(winner)}
                  primaryColor='black'
                  contrastColor='white'
                  buttonText='Spin'
                  isOnlyOnce={false}
                  size={150}
                  upDuration={100}
                  downDuration={1000}
                  fontFamily='Arial'
                />
              </dl>
            </div>
            <div className="" style={{marginTop: '-200px'}}>
              {hash && <a target="_blank" className='text-blue-600 cursor-pointer' href={explorerURL({ txSignature: hash, baseExplorerUrl: configUrl[_.find(chains, { id: currentChainId })?.nativeCurrency.replacedName || 'optimisum']['explorerUrl'] })}>Transaction Hash</a>}
              {isConfirming && <div>Waiting for confirmation...</div>}
              {isConfirmed && <div>Transaction confirmed.</div>}
              {error && (
                <div className='text-red-500'>Error: {error.message}</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
