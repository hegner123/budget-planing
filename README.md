# Forecast Algorithm

## Description

The purpose of this algorithm is to create daily balances for a given account. The algorithm will take in a starting balance, a list of transactions, a list of incomes, and a length of time to predict. The algorithm will then return a list of daily balances for the given length of time.


* List of incomes with dates and repeated frequency

* List of expenses with dates and repeated frequency

* Starting balance 

* Starting date

* Forecast length 

* Starting  balance


- [x] Create a list with the starting balance

- [x] Create a list of all incomes derived from frequency and forecast length
- [x] For each income
* Refresh date to current month
    * If Repeated
        * Determine the number of repeats from forecast length
        * Create a list of incomes with dates and amounts
        * Return list
    * Else
        * Return list with single income

    
* Create a lost of all expenses derived from frequency and forecast length
    * Refresh date to current month   
        * If Repeated
            * Determine the number of repeats from forecast length
            * Create a list of expenses with dates and amounts
            * Return list
        * Else
            * Return list with single income



For each day in forecast length

* Find any matching dates in income
* Total matching income
* Add matching incomes to balance  

* Find any matching dates in expenses
* Total matching expenses
* Subtract expenses from balance

Display: 
* date 
* balance 
* list of matching incomes
* list of matching expenses





