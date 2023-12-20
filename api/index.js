import axios from 'axios';
import { cargos, draft_flight } from './MockData';

const ip = '192.168.0.102'
const apiPort = '8000'
const imagesPort = '9000'
export const imageBaseURL = `http://${ip}:${imagesPort}/images`
export const imagePlaceholder = require(`../assets/placeholder.jpeg`)

export const axiosAPI = axios.create({ baseURL: `http://${ip}:${apiPort}/api/`, timeout: 1000 });
export const axiosImage = axios.create({ baseURL: `http://${ip}:${imagesPort}/images/`, timeout: 500 });

export async function getAllCargos(name, low_price, high_price) {
    let url = 'cargo'
    let several_args = false
    if (name !== undefined || low_price !== undefined || high_price !== undefined) {
        url += `?`
    }
    if (name !== undefined) {
        url += `name=${name}`
        several_args = true
    }
    if (low_price !== undefined) {
        if (several_args) url += `&`
        url += `low_price=${low_price}`
        several_args = true
    }
    if (high_price !== undefined) {
        if (several_args) url += `&`
        url += `high_price=${high_price}`
    }

    return axiosAPI.get(url)
        .then(response => response.data)
        .catch(_ => fromMock(name, low_price, high_price))
}

function fromMock(name, low_price, high_price) {
    let filteredCargos = Array.from(cargos.values())
    if (name !== undefined) {
        let lower_name = name.toLowerCase()
        filteredCargos = filteredCargos.filter(
            (cargo) => cargo.name.toLowerCase().includes(lower_name)
        )
    }
    if (low_price !== undefined) {
        filteredCargos = filteredCargos.filter(
            (cargo) => cargo.price >= Number(low_price)
        )
    }
    if (high_price !== undefined) {
        filteredCargos = filteredCargos.filter(
            (cargo) => cargo.price <= Number(high_price)
        )
    }

    return { draft_flight, cargos: filteredCargos }
}

export async function getCargo(cargoId) {
    if (cargoId === undefined) {
        return undefined
    }

    let url = 'cargo/' + cargoId
    return axiosAPI.get(url)
        .then(response => response.data)
        .catch(_ => cargos.get(cargoId))
}

export function ReplaceIP(oldURL) {
    if (!oldURL) {
        return ''
    }

    let updatedURL = oldURL.replace("localhost", ip);
    updatedURL = 'http://' + updatedURL
    console.log(oldURL, "->", updatedURL, ip)
    return updatedURL;
}