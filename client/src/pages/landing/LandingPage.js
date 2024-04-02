import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import WheelComponent from 'react-wheel-of-prizes'

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const segments = [
    'better luck next time',
    'won 70',
    'won 10',
    'better luck next time',
    'won 2',
    'won uber pass',
    'better luck next time',
    'won a voucher'
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
  const onFinished = (winner) => {
    console.log(winner)
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
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
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
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              Sign In
            </button>
            <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </button>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Product
                          <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                      </>
                    )}
                  </Disclosure>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Marketplace
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Company
                  </a>
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <main className="bg-white mb-20">
        <div className="relative isolate px-6 lg:px-8">
          <div className="mx-auto max-w-6xl py-16">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Polymer Phase 2
              </h1>
              <p className="mt-2 leading-8 text-gray-600">
                World of Polymer NFT Challenge
              </p>
            </div>
            <div className='mt-10 ml-5'>
              <img src="/image1.png" style={{height: '550px', width: '100%'}} alt="Description of the image" />
            </div>
          </div>
        </div>

        <div className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <div className="max-w-xl lg:max-w-lg">
                <h2 className="text-3xl font-bold tracking-tight text-black sm:text-2xl">Earn PolyER20 Tokens <br />&nbsp; &nbsp;  through Wheel Spinning</h2>
                <div className="mt-6 flex max-w-md gap-x-4">
                  <button className="ml-2 mt-20 bg-blue-500 opacity-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Try now
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 right-0">
                <div></div>
                <div className="flex flex-col items-start justify-end right-0">
                  <img src="/wheel.png" alt="Description of the image" />
                  {/* <WheelComponent
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
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-6xl px-6 py-5 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <div className="max-w-xl lg:max-w-lg">
                <img src="/image2.png" alt="Description of the image" />
              </div>
              <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                <div></div>
                <div className="max-w-xl lg:max-w-lg">
                  <h2 className="text-3xl font-bold tracking-tight text-black sm:text-2xl">Purchase NFTs with <br />PolyER20 Tokens</h2>
                  <div className="mt-6 flex max-w-md gap-x-4">
                    <button className="ml-2 mt-20 bg-blue-500 opacity-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Try now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <div className="max-w-xl lg:max-w-lg">
                <h2 className="text-3xl font-bold tracking-tight text-black sm:text-2xl">
                  Collect NFTs to earn Points <br />
                  and Climb the Leaderboard</h2>
                <div className="mt-6 flex max-w-md gap-x-4">
                  <button className="ml-2 mt-20 bg-blue-500 opacity-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Try now
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div></div>
                <div className="max-w-xl lg:max-w-lg">
                  <img src="/image3.png" alt="Description of the image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
