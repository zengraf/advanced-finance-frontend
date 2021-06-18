import React, { useEffect, useState } from "react"
import { index } from "./AnalyticsAPI"
import { useUser } from "../settings/UserHook"
import { useToken } from "../authentication/TokenHook"
import {PlusIcon} from "@heroicons/react/solid";
import {useCategories, setCategories, useAreas, setAreas} from "./CustomHooks"
import CategoryItem from "./CategoryItem";
import AreaItem from "./AreaItem";
import CategoryDialog from "./CategoryDialog";
import AreaDialog from "./AreaDialog";

const AnalyticsScreen = ({}) => {
    const token = useToken()
    const user = useUser()
    const areas = useAreas()
    const categories = useCategories()

    const [analyticsCurrency, setAnalyticsCurrency] = useState(user.data && user.data.currencies[0])
    const [analytics, setAnalytics] = useState(null)
    const [showNewArea, setShowNewArea] = useState(false)
    const [showEditArea, setShowEditArea] = useState(false)
    const [selectedArea, setSelectedArea] = useState(null)
    const [showNewCategory, setShowNewCategory] = useState(false)
    const [showEditCategory, setShowEditCategory] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)



    useEffect(() => {
        let ignore = false

        index(token.data, analyticsCurrency != null ? analyticsCurrency.id : null).then(result => {
        if (ignore) return

        if (result.hasOwnProperty("error")) {
            // TODO: Display error
        } else {
            setAnalytics(result)
            if (analyticsCurrency == null)
            setAnalyticsCurrency(result.currency)
        }
        })

        return () => {
            ignore = true
        }
    }, [analyticsCurrency, token])

    return <div className="w-full grid lg:grid-cols-2 gap-12">
        <div>
            <div className="shadow overflow-hidden sm:rounded-xl bg-white">
                <table className="min-w-full table-fixed divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Area
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Spent
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Limit
                    </th>
                    <th
                        scope="col"
                        onClick={() => setShowNewArea(true)}
                        className="relative flex items-center justify-end px-6 py-3 cursor-pointer text-right text-sm font-medium text-blue-600 hover:text-blue-900"
                    >
                        <PlusIcon className="h-5 w-5 inline-block fill-current"/> Add
                    </th>
                </tr>
                </thead>
                <tbody>
                {areas.data &&
                    areas.data.map(area => {
                        const ar = analytics && analytics.areas.find(a => a.id === area.id)
                        return <AreaItem 
                          key={area.id} 
                          area={area}
                          spent={ar ? ar.total : 0}
                          onEdit={() => {
                            setSelectedArea(area);
                            setShowEditArea(true)
                          }}
                        />
                    }
                    )
                }
                </tbody>
                </table>
            </div>
        </div>
        <div>
            <div className="shadow overflow-hidden sm:rounded-xl bg-white">
                <table className="min-w-full table-fixed divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Spent
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Limit
                    </th>
                    <th
                        scope="col"
                        onClick={() => setShowNewCategory(true)}
                        className="relative flex items-center justify-end px-6 py-3 cursor-pointer text-right text-sm font-medium text-blue-600 hover:text-blue-900"
                    >
                        <PlusIcon className="h-5 w-5 inline-block fill-current"/> Add
                    </th>
                </tr>
                </thead>
                <tbody>
                {categories.data &&
                    categories.data.map(category => {
                      const cat = analytics && analytics.categories.find(c => c.id === category.id)
                      return <CategoryItem 
                        key={category.id} 
                        category={category}
                        spent={cat ? cat.total : 0}
                        onEdit={() => {
                          setSelectedCategory(category);
                          setShowEditCategory(true)
                        }}
                      />
                    })
                }
                </tbody>
                </table>
                <AreaDialog
                isOpen={showEditArea}
                onClose={() => setShowEditArea(false)}
                area={selectedArea}
                onSave={result => {
                    setAreas(oldAreas => {
                        oldAreas.data.splice(oldAreas.data.findIndex(area => area.id === result.id), 1, result)
                    return oldAreas
                    })
                    setShowEditArea(false)
                }}
                />
                <AreaDialog
                isOpen={showNewArea}
                onClose={() => setShowNewArea(false)}
                onSave={result => {
                    setAreas(oldAreas => ({data: [result, ...oldAreas.data]}))
                    setShowNewArea(false)
                }}
                />

                <CategoryDialog
                isOpen={showEditCategory}
                onClose={() => setShowEditCategory(false)}
                category={selectedCategory}
                onSave={result => {
                    setCategories(oldCategories => {
                        oldCategories.data.splice(oldCategories.data.findIndex(category => category.id === result.id), 1, result)
                    return oldCategories
                    })
                    setShowEditCategory(false)
                }}
                />
                <CategoryDialog
                isOpen={showNewCategory}
                onClose={() => setShowNewCategory(false)}
                onSave={result => {
                    setCategories(oldCategories => ({data: [result, ...oldCategories.data]}))
                    setShowNewCategory(false)
                }}
                />
            </div>
        </div>
    </div>

    
}

export default AnalyticsScreen