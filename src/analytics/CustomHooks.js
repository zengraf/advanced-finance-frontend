import {useEffect, useState} from "react";
import {dataEffect, dataInit} from "../utilities/DataUtils";
import {useToken} from "../authentication/TokenHook";
import {singletonHook} from "react-singleton-hook";
import {indexAreas, indexCategories} from "./AnalyticsAPI";

let globalSetAreas = () => { throw new Error('you must useAreas before setting its state'); };
let globalSetCategories = () => { throw new Error('you must useCategories before setting its state'); };

const useAreasImpl = () => {
  const [areas, setAreas] = useState(dataInit)
  const token = useToken()

  useEffect(() => dataEffect(token, indexAreas, setAreas), [token])

  globalSetAreas = setAreas

  return areas
}

const useCategoriesImpl = () => {
  const [categories, setCategories] = useState(dataInit)
  const token = useToken()

  useEffect(() => dataEffect(token, indexCategories, setCategories), [token])

  globalSetCategories = setCategories

  return categories
}

export const useAreas = singletonHook(dataInit, useAreasImpl)
export const setAreas = areas => globalSetAreas(areas)

export const useCategories = singletonHook(dataInit, useCategoriesImpl)
export const setCategories = categories => globalSetCategories(categories)