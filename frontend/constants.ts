export const NETWORK = import.meta.env.VITE_APP_NETWORK ?? "testnet";
export const MODULE_ADDRESS = import.meta.env.VITE_MODULE_ADDRESS;
export const CREATOR_ADDRESS = import.meta.env.VITE_FA_CREATOR_ADDRESS;
export const FA_ADDRESS = import.meta.env.VITE_FA_ADDRESS;
export const IS_DEV = Boolean(import.meta.env.DEV);
export const IS_PROD = Boolean(import.meta.env.PROD);
export const APTOS_API_KEY = import.meta.env.VITE_APTOS_API_KEY;

export const TEST_ASSETS = [
    "0x2a47830abfa662a82485ff9c73ec1133fedc4b876634db5d9c9cbc6c364b091b",
    "0x585a147eb3a99fdfcd64314ff39b54e1d3d85841adeb22e47ac769d8b9e29c65",
    "0xc75984bdc716760f91ec6f7a373503775b4496ffd4d48546c0eca6f3a35658d7",
];