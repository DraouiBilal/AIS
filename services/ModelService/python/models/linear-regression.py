import pandas as pd
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
from joblib import dump,load

data = pd.read_csv('python/models/Salary_Data.csv').iloc[:,:].values

X = data[:,0:data.shape[1]-1]
y = data[:,-1]

regressor = LinearRegression()

regressor.fit(X,y)

dump(regressor, './python/models/linear-regression.joblib') 

regressor = load('./python/models/linear-regression.joblib')

print(regressor.predict([[9]]))