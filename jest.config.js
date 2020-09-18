module.exports = {
    preset: '@vue/cli-plugin-unit-jest',    
    "moduleNameMapper": {
        "^@/(.*)$": "<rootDir>/src/$1"
      },
    "moduleFileExtensions": [
        "js",
        "json",      
        "vue"
    ],
    "transform": {      
        ".*\\.(vue)$": "vue-jest"
    },
    "setupFilesAfterEnv": ["<rootDir>/jest_setup.js"],
      
  }