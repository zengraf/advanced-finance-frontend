import React, {Fragment} from "react"
import {Link, useLocation} from "react-router-dom";
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from "@heroicons/react/solid";
import DefaultAvatar from "../utilities/DefaultAvatar";

const Navbar = ({navigationMenu, userMenu, user}) => {
  const location = useLocation()
  const current = navigationMenu.find(entry => new RegExp(`^${entry.path}.*`).exec(location.pathname))

  return <div className="h-24 px-8 flex justify-between items-center relative">
    <Menu as="div">
      {({open}) => (<>
          <Menu.Button className="focus:outline-none py-4 flex items-end">
            <h1 className="block md:hidden text-4xl">{current && current.name}</h1>
            <h1 className="hidden md:block font-display md:text-4xl lg:text-5xl">
              Finance Manager | {current && current.name}
            </h1>
            <ChevronDownIcon className={`ml-4 w-10 h-10 transition-transform duration-100 transform ${open ? 'rotate-180' : ''}`}/>
          </Menu.Button>
          {navigationMenu &&
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 -translate-y-4"
            enterTo="transform opacity-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0 -translate-y-2"
          >
            <Menu.Items
              className="absolute w-full box-content px-16 pb-4 z-20 pt-6 bg-gray-100 bg-opacity-70 backdrop-filter backdrop-blur-xl -left-16 origin-top-left focus:outline-none">
              {navigationMenu.filter(entry => entry !== current && entry.display).map(entry => <Menu.Item
                key={`navigation-${entry.path}`}>
                {({active}) => (
                  <Link
                    className={`${
                      active ? 'text-gray-900' : 'text-gray-600'
                    } group flex items-center font-display focus:ring-0 px-8 py-4`}
                    to={entry.path}
                  >
                    <span className="hidden md:block mr-2 lg:mr-3 opacity-0 md:text-4xl lg:text-5xl ">Finance Manager |</span>
                    <span className="font-light text-4xl">{entry.name}</span>
                  </Link>
                )}
              </Menu.Item>)}
            </Menu.Items>
          </Transition>
          }
        </>
      )}
    </Menu>
    {userMenu &&
    <Menu as="div" className="h-12 relative">
      <Menu.Button
        className="group flex items-center space-x-6 focus:outline-none">
        {user != null && user.avatar_url
          ? <img src={user.avatar_url} alt="avatar"
               className="w-12 h-12 object-cover rounded-full opacity-80 group-hover:opacity-100 group-focus:ring-4 group-focus:ring-gray-300"/>
          : <DefaultAvatar className="w-12 h-12 text-gray-400 group-focus:ring-4 group-focus:ring-gray-300"/>
        }
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute z-20 -right-8 w-56 mt-4 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <p className="pb-2 pt-2.5 px-3.5">Welcome, <span className="font-medium">{user && user.username}</span></p>
          {userMenu.map((section, index) => <div key={index} className="px-1 py-1">
            {section.map(entry => <Menu.Item key={entry.name}>
              {({active}) => (
                <button
                  className={`${
                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  onClick={entry.action}
                >
                  {React.createElement(entry.icon, {className: `${active ? '' : 'text-blue-600'} w-5 h-5 mr-2`})}
                  {entry.name}
                </button>
              )}
            </Menu.Item>)}
          </div>)}
        </Menu.Items>
      </Transition>
    </Menu>
    }
  </div>;
}

export default Navbar