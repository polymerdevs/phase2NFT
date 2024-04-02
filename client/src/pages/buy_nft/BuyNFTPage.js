import '../../App.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react'
import { Dialog, Disclosure, Popover } from '@headlessui/react'
import {
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function BuyNFTPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Popover.Group className="hidden lg:flex lg:gap-x-12 mr-20 mt-2">
                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                  Explore
                </a>
                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                  Stats
                </a>
                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                  Resources
                </a>
                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                  Create
                </a>
              </Popover.Group>
              <div>
                <ConnectButton />
              </div>
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
          <div className="relative isolate overflow-hidden">
            <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                <div className="max-w-xl lg:max-w-lg">
                  <h1 className="text-3xl font-bold tracking-tight text-blue-600/50 sm:text-3xl leading-loose">
                    Purchase a Mystery <br />
                    NFT which could be <br />
                    any one of the <br />
                    Polymer Phase 2 NFT <br />
                    Types
                  </h1>
                  <div className="flex max-w-md gap-x-4 mt-5">
                    <button className=" bg-blue-500 opacity-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Explore
                    </button>
                  <button className=" bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l">
                      Purchase Random NFT
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 right-0">
                  <div></div>
                  <div className="flex flex-col items-start justify-end right-0">
                  <img src="/randomize.png" alt="Description of the image" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative isolate overflow-hidden">
            <div className="mx-auto max-w-6xl px-6 py-5 lg:px-8">
            </div>
          </div>
        </main>
      </div>
  );
}

export default BuyNFTPage;
