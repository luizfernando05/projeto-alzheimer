import pandas as pd
import numpy as np
from matplotlib import pyplot as plt

from sklearn.datasets import load_iris
from sklearn.model_selection import cross_val_score
from sklearn.svm import SVC

data = load_iris() #carregando base de dados
iris = pd.DataFrame(data['data'], columns=data.feature_names) #fazendo dataframe da base de dados
iris['target'] = data.target 

svc = SVC(gamma="auto") 

X = iris.drop('target', axis=1) #separando x e y
y = iris['target'] #separando x e y

cv_result = cross_val_score(svc, X, y, cv=10, scoring="accuracy")
print('Acurácia com Cross Validation:', cv_result.mean()*100)

svc.fit(X, y)
out = svc.predict([[6.9,2.8,6.1,2.3]])
print(out)