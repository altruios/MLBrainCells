function* makeID()
	{
	let itters = 0
	while(true)
		{
		yield itters++;
	}
}
const unique_key_generator = makeID();
export default unique_key_generator;