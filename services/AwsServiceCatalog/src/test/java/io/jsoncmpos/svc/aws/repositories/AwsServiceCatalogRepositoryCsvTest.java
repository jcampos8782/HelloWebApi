package io.jsoncmpos.svc.aws.repositories;

import static org.junit.Assert.assertEquals;

import java.util.Random;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class AwsServiceCatalogRepositoryCsvTest {
	
	private static final String CSV_FILE = "dictionary.json";
	private static final Random random = new Random();
	
	private AwsServiceCatalogRepositoryCsv repository;
	
	@BeforeEach
	public void beforeEach() {
		repository = new AwsServiceCatalogRepositoryCsv(CSV_FILE);
		repository.init();
	}
	
	@Test
	public void TestFindFiltersItems() {
		// Return all
		var all = repository.find(i -> true);
		int r = random.nextInt(all.size());
		
		// Randomly select on from the list and select only it from the list
		var iterator = all.stream().iterator();
		for(int i = 0; i < r; i++) {
			iterator.next();
		}
		
		var selected = iterator.next();
		var matches = repository.find(i -> i.getName().equals(selected.getName()));
		assertEquals(1, matches.size());
		assertEquals(selected, matches.iterator().next());
	}
}
