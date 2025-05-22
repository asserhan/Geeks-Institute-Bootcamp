function displayNumbersDivisible(number){
	let i=0
    let sum=0
    while (i<=500)
    {
        if(i%number==0)
        {
            console.log(i)
            sum+=i
        }
        i++;
    }
    console.log(sum)
}
displayNumbersDivisible(23)
